import Image from "next/image";

export default function Height({ setHeightValue, value }) {
  return (
    <div>
      <label>Height:</label>
      <span className="d-flex flex-row flex-nowrap w-10">
        <input
          type="number"
          placeholder="170 cm"
          id="height"
          value={value}
          onChange={setHeightValue}
        ></input>
      </span>
    </div>
  );
}
