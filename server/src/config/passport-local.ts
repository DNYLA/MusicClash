import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async function (username, password, done) {
    let foundUser;

    try {
      foundUser = await prisma.user.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
    } catch (err) {
      return done('Unable to login! Try again.', false);
    }

    if (!foundUser) return done('Invalid Credentials!', false);

    //Verify Password with BCrypt
    let validPass = false;
    try {
      validPass = bcrypt.compareSync(password, foundUser.password);
    } catch (err) {
      return done('Unable to login!', false);
    }

    if (!validPass) {
      return done('Invalid Credential!', false);
    }

    //Send Data Back
    return done(null, foundUser);
  })
);

passport.serializeUser((user: any, cb: any) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb: any) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, avatarUrl: true },
  });

  cb(null, user);
});
