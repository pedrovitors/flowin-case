import {addItemDTO, bidDTO, Leilao, searchDTO} from "../entities/Leilao"
import {IdGenerator} from "../services/idGenerator"
import {LeilaoDatabase} from "../data/LeilaoDatabase"

export class LeilaoBusiness {

    async create(input: addItemDTO) {
        // Responsável pela validção do endpoint de adicionar um novo item ao leilão
        try {

            if (!input.title || !input.initialPrice || !input.expireDate || !input.bidProgression) {
                throw new Error("Campos 'titulo', 'preço inicial', 'data de expiração' e 'progressão de lances' são obrigatórios.")
            }

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generateId()

            const leilao: Leilao = {
                id,
                title: input.title,
                initialPrice: input.initialPrice,
                expireDate: input.expireDate,
                bidProgression: input.bidProgression
            }
            //Chamada da função que faz o "contato" com o Banco de Dados
            await new LeilaoDatabase().insertItem(leilao)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getSpecificItem(input: searchDTO) {
        try {
            const leilao: Leilao = await new LeilaoDatabase().searchSpecificItem(input.title)

            if (!leilao) {
                throw new Error("Leilão não encontrado.")
            }

            return leilao

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllItems() {
        try {
            const leilao: Leilao = await new LeilaoDatabase().searchAllItems()

            return leilao

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async bid(input: bidDTO) {
        try {
            if (!input.id) {
                throw new Error("Leilão não encontrado.")
            }

            const bid: bidDTO = {
                id: input.id,
                bid: input.bid
            }

            await new LeilaoDatabase().bid(bid)

        } catch (error) {
            throw new Error(error.message)
        }
    }
}