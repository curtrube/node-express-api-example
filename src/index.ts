import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

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
