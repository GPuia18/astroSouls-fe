"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import PhotoCarousel from "../components/PhotoCarousel";
import React, { useState } from "react";
import { getCallWithAuth, postCall } from "../components/FetchData";
import Notification from "../components/Notification";
import Header from "../components/Header";
import { postCallWithAuth } from "../components/FetchData";
import { useRouter } from "next/navigation";
import { differenceInYears } from "date-fns";

const MainPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const router = useRouter();

  if (!userData?.token) {
    router.push("/login");
  }

  const [usersInfo, setUsersInfo] = useState([]);

  const [userNr, setUserNr] = useState(0);

  const [notificationText, setNotificationText] = useState("");

  const [extended, setExtended] = useState(false);

  const likePerson = async () => {
    try {
      const data = await postCallWithAuth(
        "api/users/like",
        { search: usersInfo[userNr].user.username },
        userData.token
      );
      console.log(data);
      if (data.message == "Match") {
        setNotificationText(
          "Congrats! You matched with " + usersInfo[userNr].user.username
        );
        document.getElementById("notification").style.display = "flex";
        document.getElementById("notification").style.opacity = "1";
        setTimeout(function () {
          document.getElementById("notification").style.opacity = "0";
          document.getElementById("notification").style.display = "none";
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
    setUserNr(userNr + 1);
  };
  const dislikePerson = async () => {
    setUserNr(userNr + 1);
  };

  const getUsers = async () => {
    try {
      const data = await getCallWithAuth(
        "api/users/compatible-users",
        userData.token
      );
      console.log(data);
      setUsersInfo(data);
      setUserNr(0);
    } catch (err) {
      console.log(err);
    }
  };

  if (usersInfo.length == userNr) getUsers();

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
        <Header logo={true} premium={true} chat={true} profile={true}></Header>
        {usersInfo.length > 0 && userNr < usersInfo.length ? (
          !extended ? (
            <div className="content-main">
              <PhotoCarousel
                images={
                  usersInfo[userNr].user.images != null &&
                  usersInfo[userNr].user.images.length > 0
                    ? usersInfo[userNr].user.images
                    : []
                }
              ></PhotoCarousel>
              <div className="main-user-data">
                <div className="main-user-info">
                  {usersInfo[userNr].user.username}
                  {" - "}
                  {differenceInYears(
                    new Date(),
                    new Date(usersInfo[userNr].user.birthday)
                  )}
                  {" - "} {usersInfo[userNr].user.zodiacSign}
                </div>
                <div className="main-header">
                  {usersInfo[userNr].user.header}
                </div>
                <div className="main-tags">
                  {usersInfo[userNr].user.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <Image
                  src={"/dislike.png"}
                  height={50}
                  width={50}
                  alt="Dislike"
                  className="cursor-pointer"
                  onClick={dislikePerson}
                ></Image>
                <Image
                  width={50}
                  height={50}
                  src={"/extend.png"}
                  alt="extend"
                  className="cursor-pointer"
                  onClick={() => setExtended(!extended)}
                ></Image>
                <Image
                  src={"/like.png"}
                  height={50}
                  width={50}
                  alt="Like"
                  className="cursor-pointer"
                  onClick={likePerson}
                ></Image>
              </div>
            </div>
          ) : (
            <div className="content-main">
              {usersInfo[userNr].user.images != null ? (
                <div className="profile-pics">
                  {usersInfo[userNr].user.images.map((image) => (
                    <Image
                      width={100}
                      height={100}
                      src={`/uploads/${image}`}
                      className="small-pic"
                      alt="small-pic"
                    ></Image>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className="main-user-data">
                <div className="main-user-info">
                  {usersInfo[userNr].user.username}
                  {" - "}
                  {differenceInYears(
                    new Date(),
                    new Date(usersInfo[userNr].user.birthday)
                  )}
                  {" - "} {usersInfo[userNr].user.zodiacSign}
                </div>
                <div className="main-header">
                  {usersInfo[userNr].user.header}
                </div>
                <div className="main-tags">
                  {usersInfo[userNr].user.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="more-info-user">
                  <span>{usersInfo[userNr].user.description}</span>
                  <span>Nationality: {usersInfo[userNr].user.nationality}</span>
                  <span>
                    Languages:{" "}
                    {usersInfo[userNr].user.language
                      .reduce((accumulator, language) => {
                        return accumulator.concat(", " + language);
                      }, "")
                      .slice(2)}
                  </span>
                  <span>Height: {usersInfo[userNr].user.height} cm</span>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <Image
                  src={"/dislike.png"}
                  height={50}
                  width={50}
                  alt="Dislike"
                  className="cursor-pointer"
                  onClick={dislikePerson}
                ></Image>
                <Image
                  width={50}
                  height={50}
                  src={"/extend.png"}
                  alt="extend"
                  className="cursor-pointer"
                  onClick={() => setExtended(!extended)}
                ></Image>
                <Image
                  src={"/like.png"}
                  height={50}
                  width={50}
                  alt="Like"
                  className="cursor-pointer"
                  onClick={likePerson}
                ></Image>
              </div>
            </div>
          )
        ) : (
          <div className="content-main">Refresh for more profiles</div>
        )}
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

export default MainPage;
