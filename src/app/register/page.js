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

  const [chosenNationality, setChosenNationality] = useState("");

  const [chosenLanguages, setChosenLanguages] = useState([]);

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);

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
          nationality: chosenNationality.toUpperCase(),
          language: chosenLanguages.flatMap((language) =>
            language.toUpperCase()
          ),
          ageRangeMin: ageMin,
          ageRangeMax: ageMax,
          header,
          description,
          tags: chosenTags,
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
      {stepTwo === false ? (
        <div className="content-register">
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
      ) : (
        <div className="content-register">
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
              <div>
                <label>Birth Date:</label>
                <input
                  type="date"
                  id="birthDate"
                  onChange={setBirthDateValue}
                ></input>
              </div>
              <div className="register-step-components">
                <label>Gender:</label>
                <span className="gender-options">
                  <label>M</label>
                  <input
                    type="radio"
                    id="ganderValueM"
                    checked={genderValueM}
                    onChange={() => {
                      setGenderValueM(true);
                      if (gender !== "MALE") setGender("MALE");
                    }}
                  ></input>
                  <label>F</label>
                  <input
                    type="radio"
                    id="ganderValueF"
                    checked={genderValueF}
                    onChange={() => {
                      setGenderValueF(true);
                      if (gender !== "FEMALE") setGender("FEMALE");
                    }}
                  ></input>
                  <label>Other</label>
                  <input
                    type="radio"
                    id="ganderValueO"
                    checked={genderValueO}
                    onChange={() => {
                      setGenderValueO(true);
                      if (gender !== "OTHER") setGender("OTHER");
                    }}
                  ></input>
                </span>
              </div>
              <div className="register-step-components">
                <label>Searching for:</label>
                <span className="gender-options searching-options">
                  <label>M</label>
                  <input
                    type="checkbox"
                    id="ganderValueM"
                    checked={searching.includes("MALE")}
                    onChange={() => {
                      setSearchingValues("MALE");
                    }}
                  ></input>
                  <label>F</label>
                  <input
                    type="checkbox"
                    id="ganderValueF"
                    checked={searching.includes("FEMALE")}
                    onChange={() => {
                      setSearchingValues("FEMALE");
                    }}
                  ></input>
                  <label>Other</label>
                  <input
                    type="checkbox"
                    id="ganderValueO"
                    checked={searching.includes("OTHER")}
                    onChange={() => {
                      setSearchingValues("OTHER");
                    }}
                  ></input>
                </span>
              </div>
              <div>
                <label>Height:</label>
                <span className="d-flex flex-row flex-nowrap w-10">
                  <input type="number" placeholder="170 cm"></input>
                </span>
              </div>
              <div>
                <label>Nationality: </label>
                <select onChange={setChosenNationalityValue}>
                  {countries.map((country, index) => (
                    <option key={index} value={country.en_short_name}>
                      {country.en_short_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Languages: </label>
                <select onChange={setNewLanguage}>
                  {languages.map((language, index) => (
                    <option key={index} value={language.name}>
                      {language.name}
                    </option>
                  ))}
                </select>
                <span className="flex flex-auto gap-2 languages-chosen">
                  {chosenLanguages.map((language, index) => (
                    <span key={index} className="language-chosen">
                      <div>{language}</div>
                      <Image
                        width={20}
                        height={20}
                        src="/remove.png"
                        className="del-button"
                        alt="Delete button image"
                        onClick={() => deleteLanguage(language)}
                      ></Image>
                    </span>
                  ))}
                </span>
              </div>
              <div>
                <label>Age range:</label>
                <span className="flex flex-row gap-1 items-center">
                  <span className="age-text">Min: {ageMin + ""}</span>
                  <input
                    type="range"
                    value={ageMin}
                    min={18}
                    max={100}
                    onChange={(event) => {
                      if (Number(event.target.value) <= ageMax)
                        setAgeMin(Number(event.target.value));
                    }}
                  ></input>
                </span>
                <span className="flex flex-row gap-1 items-center">
                  <span className="age-text">Max: {ageMax + ""}</span>
                  <input
                    type="range"
                    value={ageMax}
                    min={18}
                    max={100}
                    onChange={(event) => {
                      if (Number(event.target.value) >= ageMin)
                        setAgeMax(Number(event.target.value));
                    }}
                  ></input>
                </span>
              </div>
            </div>
            <div className="register-form register-step-form">
              <div>
                <label>Write a short profile header: </label>
                <textarea
                  id="header"
                  placeholder="Header"
                  onChange={setHeaderValue}
                ></textarea>
              </div>
              <div>
                <label>Write a profile description: </label>
                <textarea
                  id="description"
                  placeholder="Description"
                  onChange={setDescriptionValue}
                ></textarea>
              </div>
              <div className="tags-content">
                <label>Tags:</label>
                <span className="flex flex-auto gap-2 languages-chosen">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      id={"tag" + index}
                      className="tag"
                      onClick={() => setNewTag(tag, index)}
                    >
                      <div>{tag}</div>
                      <Image
                        width={20}
                        height={20}
                        src="/remove.png"
                        className="del-button"
                        alt="Delete button image"
                        onClick={() => deleteTag(tag, index)}
                      ></Image>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <PrimaryButton
            text={"Register"}
            action={makeRegisterCall}
          ></PrimaryButton>
        </div>
      )}
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
