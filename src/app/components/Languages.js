import Image from "next/image";

export default function Languages({
  languages,
  chosenLanguages,
  setNewLanguage,
  deleteLanguage,
}) {
  return (
    <div>
      <label>Languages: </label>
      <select onChange={setNewLanguage}>
        {languages.map((language, index) => (
          <option key={index} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>
      <span className="flex flex-auto gap-2 languages-chosen">
        {chosenLanguages.map((language, index) => (
          <span key={index} className="language-chosen">
            <div>{language}</div>
            <Image
              width={20}
              height={20}
              src="/remove.png"
              className="del-button"
              alt="Delete button image"
              onClick={() => deleteLanguage(language)}
            ></Image>
          </span>
        ))}
      </span>
    </div>
  );
}
