import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
import { router as clashRouter } from './routes/clash';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { getFrontendURL } from './utils';
import { User as PrismaUser } from '@prisma/client';
import { Server } from 'socket.io';

import http from 'http';
import { socketHandler } from './utils/socket';
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
app.use(express.urlencoded({ extended: false })); //Allows us to retreive data from Form Submissions
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    // methods: ['GET', 'POST'],
  },
});

socketHandler(io);

//Routes
app.use('/api/auth', authRouter);
app.use('/api/clashes', clashRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>MusicClash</h1>');
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
