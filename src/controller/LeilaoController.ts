import {Request, Response} from "express"
import {addItemDTO, Leilao, searchDTO} from "../entities/Leilao"
import {LeilaoBusiness} from "../business/LeilaoBusiness"

export class LeilaoController {
// Classe que recebe o data dos inputs faz a validação ao invocar as funções
    create = async (req: Request, res: Response) => {

        try {
            let message = "Leilão criado com sucesso!"

            const input: addItemDTO = {
                title: req.body.title,
                initialPrice: req.body.initialPrice,
                expireDate: req.body.expireDate,
                bidProgression: req.body.bidProgression
            }

            await new LeilaoBusiness().create(input)

            res
                .status(201)
                .send({message})
        } catch (error) {
            res
                .status(400)
                .send(error.sqlMessage || error.message)
        }
    }

    getSpecificItem = async (req: Request, res: Response) => {
        try {
            const input: searchDTO = {
                title: req.params.title
            }

            const leilao: Leilao = await new LeilaoBusiness().getSpecificItem(input)

            res
                .status(200)
                .send({leilao})
        } catch (error) {
            res
                .status(400)
                .send(error.sqlMessage || error.message)
        }
    }

    getAllItems = async (req: Request, res: Response) => {
        try {
            const leilao: Leilao = await new LeilaoBusiness().getAllItems()

            res
                .status(200)
                .send({leilao})
        } catch (error) {
            res
                .status(400)
                .send(error.sqlMessage || error.message)
        }
    }

    bid = async (req: Request, res: Response) => {
        try {
            let message = "Lance registrado com sucesso."

            const input = {
                id:req.params.id,
                bid:req.body.bid
            }

            await new LeilaoBusiness().bid(input)

            res
                .status(201)
                .send({message})
        } catch (error) {
            res
                .status(400)
                .send(error.sqlMessage || error.message)
        }
    }
}