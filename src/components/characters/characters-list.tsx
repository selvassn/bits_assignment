import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCharacters } from "../../core/graphQL/request";
import { ICharacter } from "../../core/interface/ICharacters";
import styles from './characters.module.scss';
const CharactersList = () => {
  const { status, data, isLoading } = useGetCharacters();

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
            {data.results.map((character: ICharacter) => (
              <div className={`card col-md-6 bg-dark mb-4 ${styles.characterCard}`}>
                <div
                  className="card-body d-md-flex"
                  style={{ backgroundColor: "rgb(60, 62, 68)" }}
                >
                  <div>
                    <img src={character.image} />
                  </div>
                  <div className="">
                    <div className="character-info">
                      <h5>
                        <Link className={styles.anchor} to={`character/${character.id}`}>
                          {character.name}
                        </Link>
                      </h5>
                      <p>{character.status}</p>
                    </div>
                    
                      <div>
                        <p>Last known location:</p>
                        <p>{character.origin.name}</p>
                      </div>
                   
                    {character.episode.length > 0 && (
                      <div>
                        <p>First seen in:</p>
                        <p>{character.episode[0].name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
