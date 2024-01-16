import Image from "next/image";

export default function Header({ logo, premium, chat, main, profile }) {
  return (
    <nav id="nav">
      <div>
        {logo ? (
          <a href="/">
            <Image src="/LogoCuExtra.png" width={150} height={150} alt="Logo" />
          </a>
        ) : (
          <></>
        )}
      </div>
      <div>
        {premium ? (
          <a href="/premium">
            <Image
              src="/premium.png"
              width={150}
              height={150}
              alt="Premium"
              className="cursor-pointer"
            />
          </a>
        ) : (
          <></>
        )}
        {chat ? (
          <a href="/chats">
            <Image
              src="/chats.png"
              width={40}
              height={40}
              alt="Chats"
              className="cursor-pointer"
            />
          </a>
        ) : (
          <></>
        )}
        {main ? (
          <a href="/main">
            <Image
              src="/main.png"
              width={40}
              height={40}
              alt="Profile"
              className="cursor-pointer"
            />
          </a>
        ) : (
          <></>
        )}
        {profile ? (
          <a href="/profile">
            <Image
              src="/profil.png"
              width={40}
              height={40}
              alt="Profile"
              className="cursor-pointer"
            />
          </a>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
