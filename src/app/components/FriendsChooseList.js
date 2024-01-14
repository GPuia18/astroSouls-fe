import Image from "next/image";

export default function FriendsChooseList({ users, setUserChatValue }) {
  const allMessages = JSON.parse(localStorage.getItem("messages")) || null;

  const getText = (username) => {
    const getChosenUserMessages = allMessages.filter(
      (element) => element.username === username
    );
    return getChosenUserMessages[0]
      ? getChosenUserMessages[0].messages[
          getChosenUserMessages[0].messages.length - 1
        ].content
      : "Start a new conv";
  };
  return users && users.length > 0 ? (
    <>
      {users.map((user, index) => (
        <div
          key={index}
          className="chats-user"
          onClick={() => setUserChatValue(index)}
        >
          <Image
            src={"/profile-pic-mock.png"}
            width={30}
            height={30}
            alt="profile"
          ></Image>
          <div className="chats-user-info">
            <span className="font-semibold text-lg">{user.username}</span>
            <span className="text-xs">{getText(user.username)}</span>
          </div>
        </div>
      ))}
    </>
  ) : (
    <></>
  );
}
