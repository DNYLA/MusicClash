import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CreateClash } from 'utils/types';

const prisma = new PrismaClient();

export const getClashes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //http://localhost:3001/api/clashes?popular=true&new=true&limit=50
  const query = req.query;

  if (!query.popular && !query.new)
    return res.status(400).send({ message: `Provide Query` });

  let limit = query.limit ? parseInt(query.limit?.toString()) : 50;
  if (!limit || limit > 50) limit = 50; //Incase ParseInt returns null || limit is > 50

  const fetchPopular =
    query.popular?.toString().toLowerCase() == 'true' ? true : false;
  const fetchNew = query.new?.toString().toLowerCase() == 'true' ? true : false;

  let popularClashes;
  let newClashes;
  const includeCount = { TrackSet: { select: { _count: true } } };
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7);
  try {
    if (fetchPopular)
      popularClashes = await prisma.clash.findMany({
        include: includeCount,
        take: limit,
      });
    if (fetchNew)
      newClashes = await prisma.clash.findMany({
        include: includeCount,
        take: limit,
        orderBy: [{ createdAt: 'desc' }],
        where: { createdAt: { gte: dateLimit } },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Try Again!' });
  }

  // return res.send({ fetchPopular, fetchNew, limit });
  return res.send({ popular: popularClashes, new: newClashes });
};

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

// Streams Data -> Client
// I may switch to this method if i notice a lag when deplying to a web server.
// export const getClashes = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   const chunkData = await prisma.clash.findMany({ where: { id: 4 } });
//   res.write(JSON.stringify(chunkData), 'utf8');

//   const chunk3 = await prisma.clash.findMany();
//   res.write(JSON.stringify(chunk3), 'utf8');
//   setTimeout(() => {
//     const chunk2 = { type: 'new', dataId: 120 };
//     res.write(JSON.stringify(chunk2), 'utf8');
//     res.end();
//   }, 5000);
// };
