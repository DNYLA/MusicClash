import { login, signup } from '../controllers/auth';
import express, { Router, Request, Response } from 'express';

const router = Router();

router.post('/signup', signup);
router.get('/login', login);

export { router };
