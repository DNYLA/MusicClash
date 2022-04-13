import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CreateClash } from 'utils/types';

const prisma = new PrismaClient();

export const getClash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  if (!query || !query.id) return res.sendStatus(400);

  let fetchedClash;
  try {
    const id = parseInt(query.id.toString());
    if (isNaN(id))
      return res.status(400).send({ message: `Clash doesn't exist` });

    fetchedClash = await prisma.clash.findUnique({
      where: { id },
      include: { TrackSet: { include: { tracks: true } } },
    });
    console.log('here');
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Unable to fetch clash.' });
  }

  if (!fetchedClash)
    return res.status(400).send({ message: `Clash doesn't exist` });

  return res.send(fetchedClash);
};

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

  if (!clash) return res.status(400).send(); //No Response because user is manually posting (We Dont want them to know why its cancelled)

  //undefined data can cause an error
  try {
    const validTitles = !!(clash.title && setOne.title && setTwo.title);
    const setOneValid = !!(setOne && setOne.tracks.length > 0);
    const setTwoValid = !!(setTwo && setTwo.tracks.length > 0);

    if (!validTitles)
      return res
        .status(400)
        .send({ message: `Clash title or set titles can't be empty.` });

    if (!setOneValid || !setTwoValid)
      return res
        .status(400)
        .send({ message: 'Provide two sets with atleat one track in each.' });
  } catch (err) {
    return res.status(400);
  }
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
