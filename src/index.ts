import express from "express";
import { Express, Request, Response } from "express";
import DbService from "./dbService";
import { QueryResultRow } from 'pg';

type UUID = string;

interface Transaction extends QueryResultRow {
    id: UUID,
    merchant: string,
    amount: number,
    date: string
}

const app: Express = express();
const port: number = 3000;

const dbConfig = {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'test',
};

const dbService = new DbService(dbConfig)

app.get('/', async (req: Request, res: Response) => {
    try {
        const transactions: Transaction[] = await dbService.query<Transaction>("SELECT * FROM transactions;")
        return res.status(200).json({transactions})
    } catch (err) {
        console.error(`Error fetching transactions: ${err}`)
        return res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log("Listening on port", port);
})
