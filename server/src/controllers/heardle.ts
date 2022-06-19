import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { CreateClash } from 'utils/types';
const SoundCloud = require('soundcloud-api-client');
var YoutubeMp3Downloader = require('youtube-mp3-downloader');

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

  // var YD = new YoutubeMp3Downloader({
  //   ffmpegPath: '/audio/', // FFmpeg binary location
  //   outputPath: '/audio', // Output file location (default: the home directory)
  //   youtubeVideoQuality: 'highestaudio', // Desired video quality (default: highestaudio)
  //   queueParallelism: 2, // Download parallelism (default: 1)
  //   progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
  //   allowWebm: false, // Enable download from WebM sources (default: false)
  // });

  // YD.download('Vhd6Kc4TZls');

  // YD.on('finished', function (err: any, data: any) {
  //   console.log(JSON.stringify(data));
  // });

  // YD.on('error', function (error: any) {
  //   console.log(error);
  // });

  // YD.on('progress', function (progress: any) {
  //   console.log(JSON.stringify(progress));
  // });

  return res.send(newHeardle);
};
