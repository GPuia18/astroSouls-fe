"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useEffect, useState } from "react";
import {
  getCall,
  getCallWithAuth,
  postCall,
  postCallWithAuth,
} from "../components/FetchData";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Product from "../components/Product";
import Header from "../components/Header";
import HeaderProfile from "../components/HeaderProfile";

const UserList = () => {
  const router = useRouter();

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const userDataExtended =
    JSON.parse(localStorage.getItem("userDataExtended")) || [];

  const [users, setUsers] = useState([]);

  const [getData, setGetData] = useState(true);

  const banAction = async (product) => {
    try {
      const data = await postCallWithAuth(
        "api/users/ban",
        product,
        userData.token
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const data = await getCallWithAuth("api/users", userData.token);
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (getData) getUsers();
    setGetData(false);
  }, []);

  return (
    <div className="landing-back">
      {/* <Notification text={notificationText}></Notification> */}
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
          premium={false}
          main={true}
          chat={true}
          profile={true}
        ></Header>

        <div className="content-main">
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="chat-header">
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/profile-pic-mock.png"}
                    width={30}
                    height={30}
                    alt="profile"
                  ></Image>
                  <div className="chats-user-info">
                    <span className="font-semibold text-xl">
                      {user.username}
                    </span>
                  </div>
                </div>
                <div
                  className="button-ban"
                  onClick={() =>
                    banAction({
                      search: user.username,
                    })
                  }
                >
                  Block
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
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

export default UserList;
