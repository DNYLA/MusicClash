import { login, signup } from '../controllers/auth';
import express, { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.post('/signup', signup);
// router.get('/login', login);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'user',
    failureRedirect: 'failed',
  }),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get('/user', (req, res) => {
  // const {} = req.user;
  // const {} =
  if (!req.user) return res.status(401).send('Not logged in');

  const { id, username, avatarUrl } = req.user;

  return res.json({ id, username, avatarUrl });
});

router.get('/failed', (req, res) => {
  res.status(401).send('Invalid Credentials');
});

export { router };
