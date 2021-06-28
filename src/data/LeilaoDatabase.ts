import {BaseDatabase} from "./BaseDatabase"
import {bidDTO, Leilao} from "../entities/Leilao"

export class LeilaoDatabase extends BaseDatabase {
// Funções responsáveis por adicionar o item ao Banco de Dados.
    async insertItem(item: Leilao) {
        try {
            await this.connection("FLOWIN_LEILAO")
                .insert({
                    id: item.id,
                    title: item.title,
                    initial_price: item.initialPrice,
                    expire_date: item.expireDate,
                    bid_progression: item.bidProgression
                })

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async searchSpecificItem(title: string): Promise<Leilao> {
        // Utilizando o raw do Knex, consigo usar a função Timestampdiff do MySQL para receber o tempo restante de um
        // leilão, neste caso em minutos.
        try {
            const queryResult = await this.connection.raw(`
                SELECT title,
                       initial_price,
                       TIMESTAMPDIFF(MINUTE, CURDATE(), FLOWIN_LEILAO.expire_date) as expire_date,
                       bid_progression,
                       current_bid
                FROM FLOWIN_LEILAO
                WHERE title = "${title}"
            `)

            return (queryResult[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async searchAllItems(): Promise<Leilao> {
        try {
            const queryResult: any = await this
                .connection("FLOWIN_LEILAO")
                .select("*")

            return queryResult

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async bid(input: bidDTO): Promise<void> {
        // Função para dar lance a um leilão, aqui é verificado se a progressão do leilão é atendida,
        // e se o valor enviado é maior que o valor salvo no banco
        try {
            let userId = input.id
            let lastBid: number = await this.getLastBid(userId)
            let bidProgression: number = await this.getBidProgression(userId)

            if ((input.bid % bidProgression) != 0){
                throw new Error("Lance não respeita a progressão.")
            }

            if (input.bid <= lastBid) {
                throw new Error("Lance dado precisa ser maior que lance anterior.")
            }

            await this.connection.raw(`
                UPDATE FLOWIN_LEILAO
                SET current_bid = "${input.bid}"
                WHERE id = "${input.id}"
            `)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getBidProgression(id: string): Promise<number> {
        // Consulta no banco de dados o valor da bid_progression para que seja validado na hora de enviar um lance.
        try {
            const result: any = await this.connection.raw(`
                SELECT bid_progression
                FROM FLOWIN_LEILAO
                WHERE id = "${id}"
            `)

            return (result[0][0].bid_progression)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getLastBid(id: string): Promise<number> {
        // Consulta no banco de dados o valo da current_bid para que seja validado na hora de enviar um lance.
        try {
            const result: any = await this.connection.raw(`
                SELECT current_bid
                FROM FLOWIN_LEILAO
                WHERE id = "${id}"
            `)

            return (result[0][0].current_bid)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}