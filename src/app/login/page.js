"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useState } from "react";
import {
  getCallWithAuth,
  postCall,
  postCallWithAuth,
} from "../components/FetchData";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");

  const [notificationText, setNotificationText] = useState("");

  const setUsernameValue = () => {
    setUsername(document.getElementById("username").value);
  };

  const setPasswordValue = () => {
    setPasword(document.getElementById("password").value);
  };

  const handleSetUserData = (data, users, username, messages) => {
    localStorage.setItem("userData", JSON.stringify({ token: data.token }));
    localStorage.setItem("matchedUsers", JSON.stringify(users));
    localStorage.setItem("username", JSON.stringify(username));
    console.log(messages);
    localStorage.setItem("messages", JSON.stringify(messages));

    localStorage.setItem("userDataExtended", JSON.stringify(data.astroUser));
  };

  const loginUser = async (username, password) => {
    try {
      const data = await postCall("api/auth/authenticate", {
        username,
        password,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getMatchedUsers = async (userData) => {
    try {
      const data = await postCallWithAuth(
        "api/users/matched-users",
        {},
        userData.token
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllMessages = async (userData) => {
    try {
      const data = await getCallWithAuth(
        "api/message/all-user-messages",
        userData.token
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const makeLoginCall = async () => {
    if (username !== "" && password !== "") {
      var userData = {};
      var matchedUsers = [];
      var messages;

      userData = await loginUser(username, password);

      matchedUsers = await getMatchedUsers(userData);

      messages = await getAllMessages(userData);

      //console.log(messages);

      handleSetUserData(userData, matchedUsers, username, messages);

      //router.push("/chats");
    } else {
      setNotificationText("All fields must be completed before submitting!");
      document.getElementById("notification").style.display = "flex";
      document.getElementById("notification").style.opacity = "1";
      setTimeout(function () {
        document.getElementById("notification").style.opacity = "0";
        document.getElementById("notification").style.display = "none";
      }, 5000);
    }
  };

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
      <div className="content-login">
        <Image
          src="/LogoCuExtra.png"
          width={400}
          height={400}
          alt="Picture of the author"
        />
        <div className="login-form">
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={setUsernameValue}
            ></input>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={setPasswordValue}
            ></input>
          </div>
        </div>
        <PrimaryButton text={"Login"} action={makeLoginCall}></PrimaryButton>
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

export default LoginPage;
