import { Request, Response } from 'express';

const getHello = (req: Request, res: Response) => {
  res.send('Hello World');
};

const helloHandler = {
  getHello,
};

export default helloHandler;
