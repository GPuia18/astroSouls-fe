import Image from "next/image";

export default function Searching({ searching, setSearchingValues }) {
  return (
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
  );
}
