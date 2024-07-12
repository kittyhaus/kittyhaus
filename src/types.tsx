export interface Profile {
    name: string,
    img: string
    weight: number,
    play: number,
    cuddle: number,
    eat: number,
    sleep: number
}

export interface Season {
    number: number
    current: boolean,
    profiles: Profile[],

}