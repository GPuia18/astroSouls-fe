"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useEffect, useState } from "react";
import { postCall } from "../components/FetchData";
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

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stepTwo, setStepTwo] = useState(false);

  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [searching, setSearching] = useState([]);

  const [genderValueM, setGenderValueM] = useState(false);
  const [genderValueF, setGenderValueF] = useState(false);
  const [genderValueO, setGenderValueO] = useState(false);

  const [height, setHeight] = useState();

  const [chosenNationality, setChosenNationality] = useState("");

  const [chosenLanguages, setChosenLanguages] = useState([]);

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);

  const [file, setFile] = useState(null);
  const [fileToShow, setFileToShow] = useState(null);

  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");

  const [chosenTags, setChosenTags] = useState("");

  const [notificationText, setNotificationText] = useState("");

  const setEmailValue = () => {
    setEmail(document.getElementById("email").value);
  };

  const setPasswordValue = () => {
    setPasword(document.getElementById("password").value);
  };

  const setUsernameValue = () => {
    setUsername(document.getElementById("username").value);
  };

  const setConfirmPasswordValue = () => {
    setConfirmPassword(document.getElementById("confirmPassword").value);
  };

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

  const setHeightValue = (height) => {
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
    // Update the global state
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("matchedUsers", JSON.stringify([]));
    localStorage.setItem("messages", JSON.stringify([]));
    localStorage.setItem("userDataExtended", JSON.stringify("REGULAR"));
  };

  const makeRegisterCall = async () => {
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
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
        const data = await postCall("api/auth/register", {
          username,
          email,
          password,
          confirmPassword,
          birthday: new Date(birthDate),
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
          images: fileToShow ? [fileToShow.name] : null,
        });
        console.log(data);
        handleSetUserData(data);
        router.push("/main");
      } catch (err) {
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
      <div
        className={
          stepTwo === false
            ? "content-register flex"
            : "content-register hidden"
        }
        id="stepOne"
      >
        <Image
          src="/LogoCuExtra.png"
          width={400}
          height={400}
          alt="Picture of the author"
        />
        <div className="register-form">
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
            <label>Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={setEmailValue}
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
          <div>
            <label>Confirm password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              onChange={setConfirmPasswordValue}
            ></input>
          </div>
        </div>
        <PrimaryButton
          text={"Next Step"}
          action={() => setStepTwo(true)}
        ></PrimaryButton>
      </div>
      {/* ) : ( */}
      <div
        className={
          stepTwo === false
            ? "content-register hidden"
            : "content-register flex"
        }
        id="stepTwo"
      >
        <Image
          src="/LogoCuExtra.png"
          width={400}
          height={400}
          alt="Picture of the author"
        />
        <SecondaryButton
          text={"First Step"}
          action={() => setStepTwo(false)}
        ></SecondaryButton>
        <div className="flex flex-row flex-wrap step-content justify-center">
          <div className="register-form register-step-form">
            <Birthday action={setBirthDateValue}></Birthday>

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
          </div>
          <div className="register-form register-step-form">
            <HeaderProfile setHeaderValue={setHeaderValue}></HeaderProfile>

            <DescriptionProfile
              setDescriptionValue={setDescriptionValue}
            ></DescriptionProfile>

            <Tags
              chosenTags={chosenTags}
              tags={tags}
              setNewTag={setNewTag}
              deleteTag={deleteTag}
            ></Tags>
          </div>
        </div>
        <PrimaryButton
          text={"Register"}
          action={makeRegisterCall}
        ></PrimaryButton>
      </div>
      {/* )} */}
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

export default RegisterPage;
