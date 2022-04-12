import { createClash } from '../controllers/clash';
import express, { Router, Request, Response } from 'express';

const router = Router();

//Get All | Get One -> Maybe have two EP one clash?id=&name= and clashes?limit=5&page=2&type=popular

router.get(''); //Get All -> With Query Params Max Limit 50
router.get('/clash'); //Get Specific Clash ?id={id}
router.post('/clash', createClash);
router.patch('/clash');
router.delete('/clash');

export { router };