import Image from "next/image";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";

export default function Home() {
  return (
    <div className="landing-back">
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
      <div className="content-landing">
        <Image
          src="/LogoCuExtra.png"
          width={500}
          height={500}
          alt="Picture of the author"
          className="logo-extra"
        />
        <Image
          src="/Cristal.png"
          width={300}
          height={50}
          alt="Picture of the author"
          className="cristal"
        />
        <div className="buttons-landing">
          <a href="/register">
            <PrimaryButton text={"Register"}></PrimaryButton>
          </a>
          <a href="/login">
            <SecondaryButton text={"Login"}></SecondaryButton>
          </a>
        </div>
      </div>
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
    </div>
  );
}
