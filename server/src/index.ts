import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json()); //Parses All incoming data into JSON
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
