interface IEpisode {
    name: string;
}
interface IOrigin {
    id: string;
    name: string;
}
export interface ICharacter {
    id: number;
    gender: string;
    image: string;
    name: string;
    status: string;
    episode: [IEpisode];
    origin: IOrigin;
    isFavorite?: boolean
}

export interface ICharacters {
    results: ICharacter[]
}
export interface ICharacterFilter {
    name: string;
    gender: string;
}