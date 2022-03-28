import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetCharacterDetails } from '../../core/graphQL/request';

const CharacterDetail = (props: any) => {
    const { id } = useParams();
    const { status, data, isLoading } = useGetCharacterDetails(1);

    useEffect(() => {
        if (data?.results) {
        console.log(data.results);
        }
      }, [isLoading]);
    return(
        <p>CHARACTER Detail {id}</p>
    )
}

export default CharacterDetail