import { PrismaClient } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const DEFAULT_IMAGE =
  'https://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  //Check if user already Exists
  let foundUser;
  try {
    foundUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
  } catch (err) {
    return next('Unable to sign up! Try again.');
  }

  if (foundUser) {
    return next('Email already exists. Login instead!');
  }

  //Hash with BCrypt
  let hashedPass;
  try {
    hashedPass = bcrypt.hashSync(password, 12);
  } catch (err) {
    return next('Unable to sign up!');
  }

  if (!hashedPass) return next('Unable to sign up!');

  let newUser;
  try {
    newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPass,
        avatarUrl: DEFAULT_IMAGE,
      },
    });
  } catch (err) {
    return next('Unable to sign up! Try again.');
  }

  //Generate JWT Token

  //Send Back Data
  res.status(203).json({
    id: newUser.id,
    username: newUser.username,
    avatarUrl: newUser.avatarUrl,
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout();
  res.send(200);
};

export const user = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).send('Not logged in');

  const { id, username, avatarUrl } = req.user;

  return res.json({ id, username, avatarUrl });
};

export const failed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401).send('Invalid Credentials');
};
