import React, { useContext, useEffect, useState } from "react";
import CharacterCard from "./character-card";
import styles from "./characters.module.scss";
import APP_CONST from "../../core/constants/app-constants";
import { FavCountContext, FavCountContextType } from "../../core/context/app-context";
import { ICharacter } from "../../core/interface/ICharacters";
const FavouriteCharacters = () => {
  const [favCharacters, setFavCharacters] = useState<ICharacter[]>([]);
  const { setFavCount} = useContext(FavCountContext) as FavCountContextType;
  useEffect(() => {
    if (sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)) {
      setFavCharacters(
        JSON.parse(sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!)
      );
    }
  }, []);


  /**
   * Handler to remove he favorite characters
   * @param selectedData 
   */
  const RemoveFavorite = (selectedData: ICharacter) => {
    const favList: ICharacter[] = JSON.parse(
      sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!
    );
    const index = favList.map((object) => object.id).indexOf(selectedData.id);
    favList.splice(index, 1);
    setFavCount(favList.length);
    sessionStorage.setItem(
      APP_CONST.SESSION_STORAGE_KEY,
      JSON.stringify(favList)
    );
    setFavCharacters([...favList]);
  };

  return (
    <div className={styles.characterList}>
      <div className="row">
        {favCharacters.length === 0 ? (
          <div className="text-center mt-4">
            <h2>Your Favourite list is empty</h2>
          </div>
        ) : (
          <>
            <h2 className="text-center pb-4">Your Favorite Characters</h2>
            {favCharacters.map((character: ICharacter) => (
              <CharacterCard
                toggleFavCallback={RemoveFavorite}
                key={character.id}
                character={character}
              ></CharacterCard>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouriteCharacters;
