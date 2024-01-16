import Image from "next/image";

export default function Search({ setResult, users }) {
  const filter = () => {
    const value = document.getElementById("search").value;
    const result = users.filter((user) => user.username.includes(value));
    setResult(result);
  };

  return (
    <input
      type="text"
      id="search"
      placeholder="Search"
      className="search-input"
      onChange={filter}
    ></input>
  );
}
