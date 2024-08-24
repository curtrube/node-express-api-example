import { Request, Response } from 'express';

const getHello = (req: Request, res: Response) => {
  res.status(200).json('Hello Express');
};

const helloController = {
  getHello,
};

export default helloController;
