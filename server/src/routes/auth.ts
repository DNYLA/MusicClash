import { login, signup } from '../controllers/auth';
import express, { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.post('/signup', signup);
// router.get('/login', login);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth//user',
    failureRedirect: '/failed',
  }),
  (req, res) => {
    res.send(200);
  }
);

router.get('/user', (req, res) => {
  res.send(req.user);
});

export { router };
