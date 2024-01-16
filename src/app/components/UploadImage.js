import Image from "next/image";

export default function UploadImage({ file, setFile, onSubmit }) {
  return (
    <div className="upload-file-container-profile">
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" className="cursor-pointer" />
      </form>
      {file != null ? (
        <Image
          alt="profile pic"
          width={100}
          height={100}
          src={`/uploads/${file.name}`}
        ></Image>
      ) : (
        <></>
      )}
    </div>
  );
}
