import debounce from "lodash.debounce";
import React, { useState, useMemo } from "react";
import { ICharacterFilter } from "../../core/interface/ICharacters";


const checkEqual = (prevProps: any, nextProps: any) => {
    console.log(prevProps);
   return false;
}


const CharacterFilter =  (props: any) => {
    let filterData: ICharacterFilter = { name: "", gender: "" };
    const [filterObj, setFilterObj] = useState<ICharacterFilter>(filterData);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      filterData.name =  event.target.value;
      setFilterObj((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
      props.filterCallback(filterData);
    };

    const debouncedHandler = useMemo(
      () => debounce(handleSearchChange, 300),
      []
    );

    return (
      <input
        className="form-control mr-sm-2"
        onChange={debouncedHandler}
        type="search"
        placeholder="Search"
        aria-label="Search"
      ></input>
    );
  }
;



export default React.memo(CharacterFilter, checkEqual);
