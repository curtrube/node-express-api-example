import { Request, Response } from 'express';

const getHello = (req: Request, res: Response) => {
  res.status(200).json('Hello World');
};

const helloHandler = {
  getHello,
};

export default helloHandler;
