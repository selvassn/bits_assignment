import React, {createContext} from 'react';


export type FavCountContextType = {
    favCount: number;
    setFavCount: (count: number) => void;
  };

  export const FavCountContext = createContext<FavCountContextType | null>(null);