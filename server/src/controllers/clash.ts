import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CreateClash } from 'utils/types';

const prisma = new PrismaClient();

export const createClash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clash: CreateClash = req.body;
  const user = req.user;

  // if (!user) return res.sendStatus(403);

  if (clash.sets.length < 2) return;

  const setOne = clash.sets[0];
  const setTwo = clash.sets[1];

  const setOneValid = !!(setOne && setOne.tracks.length > 0);
  const setTwoValid = !!(setTwo && setTwo.tracks.length > 0);

  if (!setOneValid || !setTwoValid)
    return res
      .status(400)
      .send({ message: 'Provide two sets with atleat one track in each.' });

  //Sets Position for each track
  setOne.tracks.forEach((t, i) => (t.position = i));
  setTwo.tracks.forEach((t, i) => (t.position = i));

  let createdClash;
  try {
    createdClash = await prisma.clash.create({
      data: {
        title: clash.title,
        creatorId: 1,
        TrackSet: {
          create: [
            {
              title: setOne.title,
              tracks: { createMany: { data: setOne.tracks } },
            },
            {
              title: setTwo.title,
              tracks: { createMany: { data: setTwo.tracks } },
            },
          ],
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Unable to process request.' });
  }

  return res.status(201).send({ id: createdClash.id });
};
