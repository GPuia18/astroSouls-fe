import Image from "next/image";

export default function PrimaryButton({ text, action }) {
  return (
    <div className="primary-button" onClick={action}>
      {text}
    </div>
  );
}
