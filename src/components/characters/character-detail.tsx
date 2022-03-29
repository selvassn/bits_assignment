import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useParams } from "react-router-dom";
import { useGetCharacterDetails } from "../../core/graphQL/request";

const CharacterDetail = (props: any) => {
  const { id } = useParams();
  const { status, data, isLoading } = useGetCharacterDetails(parseInt(id!));

  return (
    <React.Fragment>
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
        <div>
          <h2 className="text-center pb-4">{data.name}</h2>
          <div className="row">
            <div className="col-lg-4 text-center">
              <img
                className="text-center pb-4"
                src={data.image}
                alt={data.name}
              />
            </div>
            <div className="col-md-4">
              <h3>General</h3>
              <p>
                <strong> Name :</strong> {data.name}
              </p>
              <p>
                <strong> Status :</strong> {data.status}
              </p>
              <p>
                <strong> Type :</strong> {data.type}
              </p>
              <p>
                <strong> Gender :</strong> {data.gender}
              </p>
              <p>
                <strong> Species :</strong> {data.species}
              </p>
              <p>
                <strong> Location :</strong> {data.location.name}
              </p>
            </div>
            <div className="col-md-4">
              <h3>Episodes</h3>
              <ul>
                {data.episode.map((epidata: any) => (
                  <li key={epidata.id}>{epidata.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CharacterDetail;
