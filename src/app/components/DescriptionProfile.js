import Image from "next/image";

export default function DescriptionProfile({ setDescriptionValue, value }) {
  return (
    <div>
      <label>Write a profile description: </label>
      <textarea
        id="description"
        placeholder="Description"
        onChange={setDescriptionValue}
        value={value}
      ></textarea>
    </div>
  );
}
