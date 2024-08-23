import express from 'express';
import { Express, Request, Response } from 'express';
import DbService, { dbConfig } from './dbService';
import { QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface Transaction extends QueryResultRow {
  id: number;
  merchant: string;
  amount: number;
  date: string;
}

const app: Express = express();
const port: number = 3000;

app.use(express.json());

const dbService = new DbService(dbConfig);

app.get('/', async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM transactions;';
    const transactions: Transaction[] = await dbService.query<Transaction>(sql);
    return res.status(200).json({ transactions });
  } catch (err) {
    console.error(`Error fetching transactions: ${err}`);
    return res.sendStatus(404);
  }
});

app.post('/', async (req: Request<{}, {}, Transaction>, res: Response) => {
  const transaction = req.body;
  const requiredKeys = ['merchant', 'amount', 'date'];
  for (let key of requiredKeys) {
    if (!Object.keys(transaction).includes(key)) {
      console.error(`Create transaction request missing key: ${key}`);
      return res.status(400).json(`Request missing prop: ${key}`);
    }
  }
  const sql = `
        INSERT INTO transactions(merchant, amount, date)
        VALUES ($1, $2, $3) 
        RETURNING id, merchant, amount, date;
    `;
  const values = [transaction.merchant, transaction.amount, transaction.date];
  const transactions: Transaction[] = await dbService.query<Transaction>(sql, values);
  return res.status(201).json(transactions[0]);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
