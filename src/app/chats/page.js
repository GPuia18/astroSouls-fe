"use client";
import io from "socket.io-client";
import Notification from "../components/Notification";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Image from "next/image";
import Search from "../components/Search";
import FriendsChooseList from "../components/FriendsChooseList";
import ChosenChat from "../components/ChosenChat";
import { postCallWithAuth } from "../components/FetchData";
import { useRouter } from "next/navigation";
import { GetStaticProps } from "next";

// async function getUsers() {
//   const { globalUser, setGlobalUser } = useGlobalContext();
//   if (!globalUser?.data?.token) {
//     return [];
//   }
//   try {
//     const data = await postCallWithAuth(
//       "api/users/matched-users",
//       {},
//       globalUser.data.token
//     );
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

const Chats = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  const matchedUsers = JSON.parse(localStorage.getItem("matchedUsers")) || null;
  const messages = JSON.parse(localStorage.getItem("messages")) || null;
  const username = JSON.parse(localStorage.getItem("username")) || null;

  const router = useRouter();

  if (!userData?.token) {
    router.push("/login");
  }

  const [notificationText, setNotificationText] = useState("");

  //const [newMessage, setNewMessage] = useState("");

  const [showPeople, setShowPeople] = useState(false);

  const [userNr, setUserNr] = useState(0);
  localStorage.setItem(
    "chosenUsername",
    JSON.stringify(matchedUsers[userNr].username)
  );

  const showHidePeople = () => {
    console.log("yes");
    if (showPeople == true) {
      document.getElementById("chats-people").style.transform =
        "translateX(-100%)";
      setShowPeople(false);
    } else {
      document.getElementById("chats-people").style.transform =
        "translateX(0%)";
      setShowPeople(true);
    }
  };

  const setUserChatValue = (index) => {
    setUserNr(index);
  };

  var usersStatic = [];
  var messagesStatic = [];

  return (
    <div className="landing-back">
      <Notification text={notificationText}></Notification>
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
      <div className="main">
        <Header
          logo={true}
          premium={true}
          chat={false}
          main={true}
          profile={true}
        ></Header>
        <div className="chats">
          <div className="show-btn" onClick={showHidePeople}>
            {showPeople ? "Hide" : "Show"}
          </div>
          <div className="chats-people" id="chats-people">
            <Search></Search>
            <FriendsChooseList
              users={matchedUsers}
              setUserChatValue={setUserChatValue}
            ></FriendsChooseList>
          </div>
          <div className="chats-chosen">
            <ChosenChat
              user={matchedUsers[userNr].username}
              currentUserMessages={messages}
            ></ChosenChat>
          </div>
        </div>
      </div>
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
    </div>
  );
};

export default Chats;
