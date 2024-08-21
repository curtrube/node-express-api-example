import express from "express";
import { Express, Request, Response } from "express";
import pg, { PoolClient } from 'pg';
import { Client, Pool } from 'pg';

type UUID = string;

interface Transaction {
    id: UUID,
    merchant: string,
    amount: number,
    date: string
}

const app: Express = express();
const port: number = 3000;

async function getAllTransactions(): Promise<Transaction[]> {
    const pool: Pool = new pg.Pool({
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        port: 5432,
        database: 'test',
        max: 5,
    });
    const client: PoolClient = await pool.connect();
    try {
        const res = await client.query<Transaction>('select * from transactions;')
        const transactions: Transaction[] = res.rows;
        return transactions;
    }
    catch (err) {
        throw(err)
    } finally {
        console.log('releasing client')
        client.release();
    }
}

async function getTransactions() {
    const transactions = await getAllTransactions()
    for (const transaction of transactions) {
        console.log(transaction)
    }
}

getTransactions()


app.get('/', (req: Request, res: Response) => {

    return res.status(200).json(
        {
        body: 'Hello World',
        status: 200
    });
})

app.listen(port, () => {
    console.log("Listening on port", port);
})
