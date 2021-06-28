export type Leilao = {
    id: string
    title: string
    initialPrice: number
    expireDate: Date
    bidProgression: number
}

export interface addItemDTO {
    title: string
    initialPrice: number
    expireDate: Date
    bidProgression: number
}

export interface searchDTO {
    title: string
}

export interface bidDTO {
    id: string,
    bid: number
}
