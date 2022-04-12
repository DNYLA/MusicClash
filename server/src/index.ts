import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { getFrontendURL } from './utils';
import { User as PrismaUser } from '@prisma/client';
require('./config/passport-local');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

//Middleware
app.use(
  cors({
    origin: [getFrontendURL()],
    credentials: true,
  })
);

app.use(
  session({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.json()); //Parses All incoming data into JSON
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>MusicClash</h1>');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
