"use client";
import Image from "next/image";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import React, { useEffect, useState } from "react";
import {
  getCall,
  getCallWithAuth,
  postCall,
  postCallWithAuth,
} from "../../components/FetchData";
import Notification from "../../components/Notification";
import { useRouter } from "next/navigation";
import Product from "../../components/Product";
import Header from "../../components/Header";
import HeaderProfile from "../../components/HeaderProfile";
import PhotoCarousel from "../../components/PhotoCarousel";
import { differenceInYears } from "date-fns";

const UserPage = ({ params: { username } }) => {
  const router = useRouter();

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const [extended, setExtended] = useState(false);

  const userDataExtended =
    JSON.parse(localStorage.getItem("userDataExtended")) || [];

  const [user, setUser] = useState({});

  console.log(username);

  const [getData, setGetData] = useState(true);

  const getUser = async (username) => {
    try {
      const data = await postCallWithAuth(
        "api/users/search",
        { search: username[0] },
        userData.token
      );
      console.log(data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (getData) getUser(username);
    setGetData(false);
  }, []);

  return (
    <div className="landing-back">
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
      <div className="main">
        <Header logo={true} premium={true} chat={true} profile={true}></Header>
        {user ? (
          !extended ? (
            <div className="content-main">
              <PhotoCarousel
                images={
                  user.images != null && user.images.length > 0
                    ? user.images
                    : []
                }
              ></PhotoCarousel>
              <div className="main-user-data">
                <div className="main-user-info">
                  {username[0]}
                  {" - "}
                  {differenceInYears(new Date(), new Date(user.birthday))}
                  {" - "} {user.zodiacSign}
                </div>
                <div className="main-header">{user.header}</div>
                <div className="main-tags">
                  {user ? (
                    user.tags?.map((tag, index) => (
                      <div key={index} className="tag">
                        {tag}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <Image
                  width={50}
                  height={50}
                  src={"/extend.png"}
                  alt="extend"
                  className="cursor-pointer"
                  onClick={() => setExtended(!extended)}
                ></Image>
              </div>
            </div>
          ) : (
            <div className="content-main">
              {user.images != null ? (
                <div className="profile-pics">
                  {user.images.map((image) => (
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
                  {username[0]}
                  {" - "}
                  {differenceInYears(new Date(), new Date(user.birthday))}
                  {" - "} {user.zodiacSign}
                </div>
                <div className="main-header">{user.header}</div>
                <div className="main-tags">
                  {user ? (
                    user.tags.map((tag, index) => (
                      <div key={index} className="tag">
                        {tag}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className="more-info-user">
                  <span>{user.description}</span>
                  <span>Nationality: {user.nationality}</span>
                  <span>
                    Languages:{" "}
                    {user.language
                      .reduce((accumulator, language) => {
                        return accumulator.concat(", " + language);
                      }, "")
                      .slice(2)}
                  </span>
                  <span>Height: {user.height} cm</span>
                </div>
                <Image
                  width={50}
                  height={50}
                  src={"/extend.png"}
                  alt="extend"
                  className="cursor-pointer"
                  onClick={() => setExtended(!extended)}
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

export default UserPage;
