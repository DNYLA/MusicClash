import { failed, logout, signup, user } from '../controllers/auth';
import express, { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.post('/signup', signup);

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

router.post('/logout', logout);
router.get('/user', user);
router.get('/failed', failed);

export { router };
