import Image from "next/image";

export default function SecondaryButton({ text, action }) {
  return (
    <div className="secondary-button" onClick={action}>
      {text}
    </div>
  );
}
