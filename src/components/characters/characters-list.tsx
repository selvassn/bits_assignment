import React, { useEffect, useState } from "react";
import APP_CONST from "../../core/constants/app-constants";
import { useGetCharacters } from "../../core/graphQL/request";
import { ICharacter } from "../../core/interface/ICharacters";
import CharacterCard from "./character-card";
import styles from "./characters.module.scss";
const CharactersList = () => {
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  const { status, data, isLoading } = useGetCharacters();

  useEffect(() => {
    if (data?.results) {
      setCharacterList(data.results);
      sessionStorage.setItem(APP_CONST.SESSION_STORAGE_KEY, JSON.stringify([]));
    }
  }, [isLoading]);

  const toggleFavorite = (selectedData: ICharacter) => {

    const favList: ICharacter[] = JSON.parse(sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!);
    const index = favList.map(object => object.id).indexOf(selectedData.id);
    if(index === -1) {
      favList.push({...selectedData, isFavorite: !selectedData.isFavorite})
    } else {
      favList.splice(index,1);
    }

    setCharacterList(
      characterList.map((item) =>
        item.id === selectedData.id
          ? { ...item, isFavorite: !selectedData.isFavorite }
          : item
      )
    );
    sessionStorage.setItem(APP_CONST.SESSION_STORAGE_KEY, JSON.stringify(favList));
  };

  if (isLoading) {
    return <p> Loading</p>;
  }

  return (
    <div className={styles.characterList}>
      <div className="row">
        {isLoading ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error</span>
        ) : (
          <>
            {characterList.map((character: ICharacter) => (
             <CharacterCard toggleFavCallback={toggleFavorite} key={character.id} character={character}></CharacterCard>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
