import Image from "next/image";

export default function AgeRange({ ageMin, ageMax, setAgeMin, setAgeMax }) {
  return (
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
  );
}
