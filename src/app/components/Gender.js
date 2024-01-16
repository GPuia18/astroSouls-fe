import Image from "next/image";

export default function Gender({
  genderValueM,
  genderValueF,
  genderValueO,
  setGenderValueM,
  setGenderValueF,
  setGenderValueO,
  setGender,
  gender,
}) {
  return (
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
  );
}
