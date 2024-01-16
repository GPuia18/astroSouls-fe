import Image from "next/image";

export default function Nationality({ countries, setChosenNationalityValue }) {
  return (
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
  );
}
