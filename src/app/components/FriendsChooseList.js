import Image from "next/image";

export default function FriendsChooseList({ users, setUserChatValue }) {
  const allMessages = JSON.parse(localStorage.getItem("messages")) || null;
  const matchedUsers = JSON.parse(localStorage.getItem("matchedUsers")) || null;

  const getLittleText = (text) => {
    if (text.length > 10) {
      return text.slice(0, 10) + "...";
    }
    return text;
  };

  const getText = (username) => {
    const getChosenUserMessages = allMessages.filter(
      (element) => element.username === username
    );
    return getChosenUserMessages[0]
      ? getLittleText(
          getChosenUserMessages[0].messages[
            getChosenUserMessages[0].messages.length - 1
          ].content
        )
      : "Start a new conv";
  };
  return users && users.length > 0 ? (
    <>
      {users.map((user, index) => (
        <div
          key={index}
          className="chats-user"
          onClick={() => {
            const number = matchedUsers.forEach((user1, index1) => {
              if (user.username === user1.username) {
                setUserChatValue(index1);
              }
            });
          }}
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
