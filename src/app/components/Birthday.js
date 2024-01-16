import Image from "next/image";

export default function Birthday({ action, value }) {
  return (
    <div>
      <label>Birth Date:</label>
      <input type="date" id="birthDate" onChange={action} value={value}></input>
    </div>
  );
}
