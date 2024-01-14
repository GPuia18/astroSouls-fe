import Image from "next/image";

export default function Search({ text, action }) {
  return (
    <input
      type="text"
      id="search"
      placeholder="Search"
      className="search-input"
    ></input>
  );
}
