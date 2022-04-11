import { PrismaClient } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';

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

  let newUser;
  try {
    newUser = await prisma.user.create({
      data: {
        username,
        password,
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  let foundUser;
  try {
    foundUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    });
  } catch (err) {
    return next('Unable to login! Try again.');
  }

  if (!foundUser) return next('Invalid Credentials!');

  //Verify Password with BCrypt

  let validPass = foundUser.password === password ? true : false;
  if (!validPass) {
    return next('Invalid Credential!');
  }

  //Generate JWT Token

  //Send Data Back
  res.json({
    id: foundUser.id,
    username: foundUser.username,
    avatarUrl: foundUser.avatarUrl,
  });
};
