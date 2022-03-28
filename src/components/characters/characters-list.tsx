import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import APP_CONST from "../../core/constants/app-constants";
import { useGetCharacters } from "../../core/graphQL/request";
import { ICharacter, ICharacterFilter } from "../../core/interface/ICharacters";
import CharacterCard from "./character-card";
import styles from "./characters.module.scss";
import CharacterFilter from "./character-filters";
import { FavCountContext, FavCountContextType } from "../../core/context/app-context";
const CharactersList = () => {
  const { setFavCount} = useContext(FavCountContext) as FavCountContextType;
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);
  const [filterObj, setFilterObj] = useState<ICharacterFilter>({
    name: "",
    gender: "",
  });
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);
  const { status, data, isLoading } = useGetCharacters(
    searchEnabled,
    filterObj
  );

  useEffect(() => {
    if (data?.results) {
      setSearchEnabled(false);
      if(sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)) {
       const fav: ICharacter[] = JSON.parse(sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!);
        fav.forEach((favItem: ICharacter) => {
          const filteredItem: ICharacter =  data.results.filter((item: ICharacter) => item.id === favItem.id)[0];
          if(filteredItem) {
            filteredItem.isFavorite = true;
          }
        });
        setCharacterList(data.results);
        setFavCount(fav.length);
      } else {
        sessionStorage.setItem(APP_CONST.SESSION_STORAGE_KEY, JSON.stringify([]));
        setCharacterList(data.results);
      }
    }
  }, [isLoading]);

  const toggleFavorite = (selectedData: ICharacter) => {
    const favList: ICharacter[] = JSON.parse(
      sessionStorage.getItem(APP_CONST.SESSION_STORAGE_KEY)!
    );
    const index = favList.map((object) => object.id).indexOf(selectedData.id);
    if (index === -1) {
      favList.push({ ...selectedData, isFavorite: !selectedData.isFavorite });
     
    } else {
      favList.splice(index, 1);
    }
    setFavCount(favList.length);
    setCharacterList(
      characterList.map((item) =>
        item.id === selectedData.id
          ? { ...item, isFavorite: !selectedData.isFavorite }
          : item
      )
    );
    sessionStorage.setItem(
      APP_CONST.SESSION_STORAGE_KEY,
      JSON.stringify(favList)
    );
  };

  const filterCharacters = (data: ICharacterFilter) => {
    setFilterObj(data);
    setSearchEnabled(true);
  };

  return (
    <div className={styles.characterList}>
      <div className="row">
        <CharacterFilter
          filterCallback={filterCharacters}
          filterData={filterObj}
        ></CharacterFilter>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : status === "error" ? (
          <div className="text-center mt-4">
          <h2>No data found, Please change your search Criteria</h2>
          </div>
        ) : (
          <>
            {characterList.map((character: ICharacter) => (
              <CharacterCard
                toggleFavCallback={toggleFavorite}
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

export default CharactersList;
