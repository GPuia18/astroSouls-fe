import Image from "next/image";

export default function HeaderProfile({ setHeaderValue, value }) {
  return (
    <div>
      <label>Write a short profile header: </label>
      <textarea
        id="header"
        placeholder="Header"
        onChange={setHeaderValue}
        value={value}
      ></textarea>
    </div>
  );
}
