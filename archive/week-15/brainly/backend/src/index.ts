import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import contentRouter from './routes/contentRoutes';
import brainShareRouter from './routes/shareRoutes';

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/brain/', brainShareRouter);

app.listen(PORT, () => {
	console.log(`Server started running on port ${PORT}`);
});
