import Image from "next/image";

export default function Tags({ chosenTags, tags, setNewTag, deleteTag }) {
  return (
    <div className="tags-content">
      <label>Tags:</label>
      <span className="flex flex-auto gap-2 languages-chosen">
        {tags.map((tag, index) => (
          <span
            key={index}
            id={"tag" + index}
            className="tag"
            onClick={() => setNewTag(tag, index)}
          >
            <div>{tag}</div>
            <Image
              width={20}
              height={20}
              src="/remove.png"
              className="del-button"
              alt="Delete button image"
              onClick={() => deleteTag(tag, index)}
            ></Image>
          </span>
        ))}
      </span>
    </div>
  );
}
