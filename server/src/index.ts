import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
import { router as clashRouter } from './routes/clash';
import { router as heardleRouter } from './routes/heardle';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { getFrontendURL } from './utils';
import { User as PrismaUser } from '@prisma/client';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketEventHandler } from './socket';
require('./config/passport-local');
dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
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

const io = new Server(httpServer);
socketEventHandler(io);

app.use(express.json()); //Parses All incoming data into JSON
app.use(express.urlencoded({ extended: false })); //Allows us to retreive data from Form Submissions
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/clashes', clashRouter);
app.use('/api/heardle', heardleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>MusicClash</h1>');
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
