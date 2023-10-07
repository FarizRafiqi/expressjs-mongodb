import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('listening on http://localhost:8000/');
});

const MONGO_URL = 'mongodb+srv://auliaelihza:IKYCjLLF5yki5MDr@cluster0.b3iqdor.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', err => {
    console.error('MongoDB error', err);
});

app.use('/', routes());