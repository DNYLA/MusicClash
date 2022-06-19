import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CreateClash } from 'utils/types';

const prisma = new PrismaClient();

export const getHeardle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //http://localhost:3001/api/clashes?popular=true&new=true&limit=50
  const query = req.query;

  const today = new Date();
  const tomorrow = new Date();
  const now = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const createdClash = await prisma.heardle.findFirst({
    where: { date: today },
  });

  if (createdClash) return res.send(createdClash);

  const newHeardle = await prisma.heardle.create({
    data: {
      title: 'Down Below',
      artist: 'Roddy Ricch',
      url: 'https://www.youtube.com/watch?v=CJOZc02VwJM',
      date: today,
    },
  });

  return res.send(newHeardle);
};
