import Image from "next/image";

export default function Notification({ text }) {
  return (
    <div className="notification" id="notification">
      {text}
    </div>
  );
}
