"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import PhotoCarousel from "../components/PhotoCarousel";
import React, { useState } from "react";
import { postCall } from "../components/FetchData";
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

  const likePerson = async () => {
    try {
      const data = await postCallWithAuth(
        "api/users/like",
        { search: usersInfo[userNr].username },
        userData.token
      );
      console.log(data);
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
      const data = await postCallWithAuth(
        "api/users/filter-search",
        {},
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
          <div className="content-main">
            <PhotoCarousel
              username={usersInfo[userNr].username}
              nrPics={
                usersInfo[userNr].pics ? usersInfo[userNr].pics.length : 0
              }
            ></PhotoCarousel>
            <div className="main-user-data">
              <div className="main-user-info">
                {usersInfo[userNr].username} -{" "}
                {differenceInYears(
                  new Date(),
                  new Date(usersInfo[userNr].birthday)
                )}{" "}
                - {usersInfo[userNr].zodiacSign}
              </div>
              <div className="main-header">{usersInfo[userNr].header}</div>
              <div className="main-tags">
                {usersInfo[userNr].tags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-10">
              <Image
                src={"/dislike.png"}
                height={50}
                width={50}
                alt="Dislike"
                className="cursor-pointer"
                onClick={dislikePerson}
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
