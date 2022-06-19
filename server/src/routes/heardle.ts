import { getHeardle } from '../controllers/heardle';
import express, { Router, Request, Response } from 'express';

const router = Router();

//Get All | Get One -> Maybe have two EP one clash?id=&name= and clashes?limit=5&page=2&type=popular

router.get('', getHeardle); //Get All -> With Query Params Max Limit 50

export { router };
