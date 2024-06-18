export interface Profile {
    id: number | null,
    name: string,
    img: string
    stats: {
        weight: number,
        play: number,
        cuddle: number,
        eat: number,
        sleep: number
    }
}

export interface Season {
    number: number
    current: boolean,
    profiles: Profile[],

}