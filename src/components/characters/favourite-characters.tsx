import React, { useEffect, useState } from "react";
import APP_CONST from "../../core/constants/app-constants";
import { ICharacter } from "../../core/interface/ICharacters";
import CharacterCard from "./character-card";
import styles from "./characters.module.scss";
const FavouriteCharacters = () => {
  const [favCharacters, setFavCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)) {
      setFavCharacters(
        JSON.parse(sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!)
      );
    }
    console.log(favCharacters);
  }, []);

  return (
    <div className={styles.characterList}>
      <div className="row">
        {favCharacters.map((character: ICharacter) => (
          <CharacterCard
            key={character.id}
            character={character}
          ></CharacterCard>
        ))}
      </div>
    </div>
  );
};

export default FavouriteCharacters;
