"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useEffect, useState } from "react";
import { postCall, putCallWithAuth } from "../components/FetchData";
import { countries } from "../data/countries";
import { languages } from "../data/languages";
import { tags } from "../data/tags";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import { getSign, getZodiac } from "node_modules/horoscope";
import Birthday from "../components/Birthday";
import Gender from "../components/Gender";
import Searching from "../components/Searching";
import Height from "../components/Height";
import Nationality from "../components/Nationality";
import Languages from "../components/Languages";
import AgeRange from "../components/AgeRange";
import HeaderProfile from "../components/HeaderProfile";
import DescriptionProfile from "../components/DescriptionProfile";
import Tags from "../components/Tags";
import UploadImage from "../components/UploadImage";
import Header from "../components/Header";

const Profile = () => {
  const router = useRouter();

  const data = JSON.parse(localStorage.getItem("userDataExtended")) || null;
  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stepTwo, setStepTwo] = useState(false);

  const [birthDate, setBirthDate] = useState(
    new Date(data.birthday).toLocaleString("en-CA").split(",")[0]
  );
  const [gender, setGender] = useState(data.gender);
  const [searching, setSearching] = useState(data.searchingFor);

  const [genderValueM, setGenderValueM] = useState(data.gender === "MALE");
  const [genderValueF, setGenderValueF] = useState(data.gender === "FEMALE");
  const [genderValueO, setGenderValueO] = useState(data.gender === "OTHER");

  const [height, setHeight] = useState(data.height);

  const [chosenNationality, setChosenNationality] = useState(data.nationality);

  const [chosenLanguages, setChosenLanguages] = useState(data.language);

  const [ageMin, setAgeMin] = useState(data.ageRangeMin);
  const [ageMax, setAgeMax] = useState(data.ageRangeMax);

  const [file, setFile] = useState(null);
  const [fileToShow, setFileToShow] = useState(null);

  const [header, setHeader] = useState(data.header);
  const [description, setDescription] = useState(data.description);

  const [chosenTags, setChosenTags] = useState(data.tags);

  const [notificationText, setNotificationText] = useState("");

  const setBirthDateValue = () => {
    console.log(calculateSign(document.getElementById("birthDate").value));
    setBirthDate(document.getElementById("birthDate").value);
  };

  const setHeaderValue = () => {
    setHeader(document.getElementById("header").value);
  };

  const setDescriptionValue = () => {
    setDescription(document.getElementById("description").value);
  };

  const changeGenderValues = useEffect(() => {
    switch (gender) {
      case "MALE":
        setGenderValueF(false);
        setGenderValueO(false);
        break;
      case "FEMALE":
        setGenderValueM(false);
        setGenderValueO(false);
        break;
      default:
        setGenderValueM(false);
        setGenderValueF(false);
        break;
    }
  }, [gender]);

  const setSearchingValues = (gender) => {
    if (!searching.includes(gender)) {
      setSearching([...searching, gender]);
    } else {
      const searchingNew = searching.filter((value) => value !== gender);
      setSearching(searchingNew);
    }
  };

  const setHeightValue = () => {
    setHeight(document.getElementById("height").value);
  };

  const setChosenNationalityValue = (event) => {
    setChosenNationality(event.target.value);
  };

  const setNewLanguage = (event) => {
    if (!chosenLanguages.includes(event.target.value))
      setChosenLanguages([...chosenLanguages, event.target.value]);
  };

  const deleteLanguage = (language) => {
    setChosenLanguages(chosenLanguages.filter((value) => language !== value));
  };

  const setNewTag = (tag, index) => {
    if (!chosenTags.includes(tag)) {
      setChosenTags([...chosenTags, tag]);
      document.getElementById("tag" + index).style.backgroundColor =
        "var(--secondary-button-bg)";
    }
  };

  const deleteTag = (tag, index) => {
    if (chosenTags.includes(tag)) {
      document.getElementById("tag" + index).style.backgroundColor =
        "transparent";
      setChosenTags(chosenTags.filter((value) => value !== tag));
    }
  };

  const calculateSign = (birthDate) => {
    const month = Number(birthDate.split("-")[1]);
    const day = Number(birthDate.split("-")[2]);
    return getSign({ month: month, day: day });
  };

  const handleSetUserData = (data) => {
    localStorage.setItem("userDataExtended", JSON.stringify(data));
  };

  const updateProfileCall = async () => {
    if (
      birthDate !== "" &&
      gender !== "" &&
      searching.length > 0 &&
      chosenNationality !== "" &&
      chosenLanguages.length > 0 &&
      header !== "" &&
      description !== "" &&
      chosenTags.length > 0
    ) {
      const zodiacSign = calculateSign(birthDate);
      try {
        const result = await putCallWithAuth(
          "api/users/edit-account",
          {
            zodiacSign,
            gender,
            searchingFor: searching,
            height: height,
            nationality: chosenNationality.toUpperCase(),
            language: chosenLanguages.flatMap((language) =>
              language.toUpperCase()
            ),
            ageRangeMin: ageMin,
            ageRangeMax: ageMax,
            header,
            description,
            tags: chosenTags,
            images: fileToShow ? [fileToShow.name] : data.images,
          },
          userData.token
        );
        console.log(result);
        handleSetUserData(result);
        router.push("/main");
      } catch (err) {
        console.log(err);
        setNotificationText("Username or email already in use!");
        document.getElementById("notification").style.display = "flex";
        document.getElementById("notification").style.opacity = "1";
        setTimeout(function () {
          document.getElementById("notification").style.opacity = "0";
          document.getElementById("notification").style.display = "none";
        }, 5000);
      }
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

  const setFileValue = (file) => {
    setFile(file);
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
      setFileToShow(file);
      //sendMessageWithImage(messageText);
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  useEffect(() => {
    chosenTags.forEach((chosenTag) => {
      tags.forEach((tag, index) => {
        if (tag === chosenTag) {
          document.getElementById("tag" + index).style.backgroundColor =
            "var(--secondary-button-bg)";
        }
      });
    });
  }, [chosenTags]);

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
          chat={true}
          main={true}
          profile={false}
        ></Header>
        <div className="content-register flex">
          <div className="flex flex-row flex-wrap step-content justify-center">
            <div className="register-form register-step-form">
              <h1 className="text-xl font-bold">{data.username}</h1>
              <Birthday
                action={setBirthDateValue}
                value={
                  new Date(birthDate).toLocaleString("en-CA").split(",")[0]
                }
              ></Birthday>

              <Gender
                genderValueM={genderValueM}
                genderValueF={genderValueF}
                genderValueO={genderValueO}
                setGenderValueM={setGenderValueM}
                setGenderValueF={setGenderValueF}
                setGenderValueO={setGenderValueO}
                setGender={setGender}
                gender={gender}
              ></Gender>

              <Searching
                searching={searching}
                setSearchingValues={setSearchingValues}
              ></Searching>

              <Height setHeightValue={setHeightValue} value={height}></Height>

              <Nationality
                countries={countries}
                setChosenNationalityValue={setChosenNationalityValue}
              ></Nationality>

              <Languages
                languages={languages}
                chosenLanguages={chosenLanguages}
                setNewLanguage={setNewLanguage}
                deleteLanguage={deleteLanguage}
              ></Languages>

              <AgeRange
                ageMin={ageMin}
                ageMax={ageMax}
                setAgeMin={setAgeMin}
                setAgeMax={setAgeMax}
              ></AgeRange>

              <UploadImage
                file={fileToShow}
                setFile={setFileValue}
                onSubmit={onSubmit}
              ></UploadImage>
              {data.images != null && data.images.length > 0 && file == null ? (
                <Image
                  src={`/uploads/${data.images[0]}`}
                  alt="profile-pic"
                  width={100}
                  height={100}
                ></Image>
              ) : (
                <></>
              )}
            </div>
            <div className="register-form register-step-form">
              <HeaderProfile
                setHeaderValue={setHeaderValue}
                value={header}
              ></HeaderProfile>

              <DescriptionProfile
                setDescriptionValue={setDescriptionValue}
                value={description}
              ></DescriptionProfile>

              <Tags
                tags={tags}
                chosenTags={chosenTags}
                setNewTag={setNewTag}
                deleteTag={deleteTag}
              ></Tags>
            </div>
          </div>
          <PrimaryButton
            text={"Update"}
            action={updateProfileCall}
          ></PrimaryButton>
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

export default Profile;
