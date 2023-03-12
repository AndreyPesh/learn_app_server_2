import { Response } from "express";
import redisClient from "../utils/connectRedis";


export const redisHandler = async (_, res: Response) => {
  const message = await redisClient.get('try');
  res.status(200).json({
    status: 'success',
    message,
  });
}