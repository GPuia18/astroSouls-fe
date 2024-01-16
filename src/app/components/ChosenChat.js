import Image from "next/image";
import { useEffect, useState } from "react";
import { postCallWithAuth } from "./FetchData";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3001"); // Replace with your server URL

export default function ChosenChat({ user, currentUserMessages }) {
  const router = useRouter();
  const allMessages = JSON.parse(localStorage.getItem("messages")) || null;
  const username = JSON.parse(localStorage.getItem("username")) || null;
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  const matchedUsers = JSON.parse(localStorage.getItem("matchedUsers")) || null;
  const userType =
    JSON.parse(localStorage.getItem("userDataExtended")).accountType || null;
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(() => {
    var m = [];
    allMessages.forEach((element) => {
      if (element.username === user) {
        m = element.messages;
      }
    });
    return m;
  });
  const chatId = user < username ? user + username : username + user;
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    setMessages(() => {
      var m = [];
      allMessages.forEach((element) => {
        if (element.username === user) {
          m = element.messages;
        }
      });
      return m;
    });
  }, [user]);

  const ids = matchedUsers.map((element) => {
    return username < element.username
      ? username + element.username
      : element.username + username;
  });

  console.log("ids", ids);

  const [joinedChat, setJoinedChat] = useState(false);
  if (!joinedChat) {
    socket.emit("join conversations", ids);
    setJoinedChat(true);
  }

  const setMessageTextValue = () => {
    setMessageText(document.getElementById("message").value);
  };

  useEffect(() => {
    const getMessagesForUsers = async () => {
      try {
        const data = await postCallWithAuth(
          "api/message/all",
          { username: user },
          userData.token
        );
        console.log(data);
        setMessages(messages);
      } catch (err) {
        console.log(err);
      }
    };
    //getMessagesForUsers();

    const handleChatMessage = (message) => {
      console.log(message);
      var found = false;
      allMessages.forEach((element, index) => {
        if (
          element.username === message.sender ||
          element.username === message.receiver
        ) {
          found = true;
          allMessages[index].messages = [
            ...allMessages[index].messages,
            {
              senderUsername: message.sender,
              content: message.content,
              receiverUsername: message.receiver,
              conversationId: chatId,
              image: message.image,
            },
          ];
        }
      });
      const userNow = JSON.parse(localStorage.getItem("chosenUsername"));
      console.log("set the message in array", allMessages);
      if (!found) {
        allMessages.push({
          username: userNow,
          messages: [
            {
              senderUsername: message.sender,
              content: message.content,
              receiverUsername: message.receiver,
              conversationId: chatId,
              image: message.image,
            },
          ],
        });
      }
      if (message.sender === username) {
        if (message.image == null) {
          sendMessageToBE({
            content: message.content,
            receiver: message.receiver,
          });
          console.log("here to DB no pic");
        } else {
          sendMessageToBEWithImage({
            content: message.content,
            image: message.image,
            receiver: message.receiver,
          });
          console.log("here to DB with pic");
        }
      }
      localStorage.setItem("messages", JSON.stringify(allMessages));
      console.log("setted the messages in local");
      setMessages(() => {
        var m = [];
        allMessages.forEach((element) => {
          console.log(element);
          if (element.username === userNow) {
            console.log("obiect gasit pentru setMessages", element);
            m = element.messages;
          }
        });
        return m;
      });
    };

    socket.on("chat message receive", handleChatMessage);

    // Cleanup: Unsubscribe from the event when the component is unmounted
    return () => {
      socket.off("chat message receive", handleChatMessage);
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("chat message", {
      conversation: chatId,
      messageText: message,
      sender: username,
      receiver: user,
    });
  };

  const sendMessageWithImage = (message) => {
    socket.emit("chat message", {
      conversation: chatId,
      messageText: message,
      sender: username,
      receiver: user,
      image: file.name,
    });
  };

  const sendMessageToBE = async ({ content, receiver }) => {
    console.log("Useru care primeste", user);
    try {
      const data = await postCallWithAuth(
        "api/message/send",
        { content: content, receiverUsername: receiver },
        userData.token
      );
      console.log(data);
      usersStatic = data;
      // setMatchedUsers(data);
      setUserNr(0);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageToBEWithImage = async ({ content, image, receiver }) => {
    console.log("Useru care primeste", user);
    try {
      const data = await postCallWithAuth(
        "api/message/send-with-image",
        { content: content, image: image, receiverUsername: receiver },
        userData.token
      );
      console.log(data);
      usersStatic = data;
      // setMatchedUsers(data);
      setUserNr(0);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      sendMessageWithImage(messageText);
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  const blockUser = async () => {
    try {
      const data = await postCallWithAuth(
        "api/users/block",
        { search: JSON.parse(localStorage.getItem("chosenUsername")) },
        userData.token
      );
      console.log(data);
      const chosenUsername = JSON.parse(localStorage.getItem("chosenUsername"));
      const filteredUsers = matchedUsers.filter(
        (user) => user.username != chosenUsername
      );
      console.log(filteredUsers);
      localStorage.setItem("matchedUsers", JSON.stringify(filteredUsers));
      router.push("/main");
      // setMatchedUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return user && user !== "" ? (
    <>
      <div className="chat-header">
        <div className="flex flex-row gap-2">
          <a href={`/user/${user}`}>
            <Image
              src={"/profile-pic-mock.png"}
              width={30}
              height={30}
              alt="profile"
            ></Image>
          </a>
          <div className="chats-user-info">
            <span className="font-semibold text-xl">{user}</span>
          </div>
        </div>
        <Image
          src={"/block.png"}
          alt="block"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={blockUser}
        ></Image>
      </div>
      <div className="chat-body">
        {messages.map((message, index) =>
          message.senderUsername == user ? (
            <div key={index} className="destinatary">
              <div className="message">
                <span className="pic-container">
                  <img
                    src="/profil.png"
                    alt="profile-mock"
                    className="profile-pic"
                  ></img>
                </span>
                {message.image ? (
                  <span className="message-text-image">
                    <Image
                      src={`/uploads/${message.image}`}
                      alt="user-pic-sent"
                      width={150}
                      height={150}
                    ></Image>
                    <span>{message.content}</span>
                  </span>
                ) : (
                  <span className="message-text">{message.content}</span>
                )}
              </div>
            </div>
          ) : (
            <div key={index} className="receiver">
              <div className="message">
                {message.image ? (
                  <span className="message-text-image">
                    <Image
                      src={`/uploads/${message.image}`}
                      alt="user-pic-sent"
                      width={150}
                      height={150}
                    ></Image>
                    <span>{message.content}</span>
                  </span>
                ) : (
                  <span className="message-text">{message.content}</span>
                )}
                <span className="pic-container">
                  <img
                    src="/profil.png"
                    alt="profile-mock"
                    className="profile-pic"
                  ></img>
                </span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="chats-send">
        {showUpload ? (
          <div className="upload-file-container">
            <form onSubmit={onSubmit}>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input type="submit" value="Upload" className="cursor-pointer" />
            </form>
          </div>
        ) : (
          <></>
        )}
        {userType && userType !== "REGULAR" ? (
          <Image
            width={20}
            height={20}
            src={"/plus-btn.png"}
            alt="Add"
            className="cursor-pointer"
            onClick={() => setShowUpload(!showUpload)}
          ></Image>
        ) : (
          <></>
        )}
        <input
          type="text"
          id="message"
          placeholder="Type your message"
          onChange={setMessageTextValue}
        ></input>
        <Image
          width={20}
          height={20}
          src={"/send-btn.png"}
          alt="Send"
          onClick={() => {
            document.getElementById("message").value = "";
            sendMessage(messageText);
          }}
          className="cursor-pointer"
        ></Image>
      </div>
    </>
  ) : (
    <></>
  );
}
