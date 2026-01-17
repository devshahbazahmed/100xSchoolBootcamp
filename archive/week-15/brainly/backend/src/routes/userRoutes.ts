import { User } from '../db';
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
	const requestInputs = z.object({
		username: z.email().min(3).max(30),
		password: z.string().min(3).max(30),
	});

	const parsedRequestInputs = requestInputs.safeParse(req.body);

	if (!parsedRequestInputs.success) {
		return res.status(411).json({
			message: 'Incorrect Inputs',
		});
	}

	const { username, password } = req.body;

	try {
		const existingUser = await User.findOne({
			username,
		});

		if (existingUser) {
			return res.status(403).json({
				message: 'User already exists',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			username,
			password: hashedPassword,
		});

		if (!newUser) {
			return res.status(411).json({
				message: 'Error in inputs',
			});
		}

		res.status(201).json({
			message: 'User created successfully',
			newUser: {
				username,
			},
		});
	} catch (error) {
		console.log('Error in creating user', error);
		return res.status(500).json({
			message: 'Internal server error',
			error,
		});
	}
});

userRouter.post('/signin', async (req: Request, res: Response) => {
	const requestBody = z.object({
		username: z.email().min(3).max(30),
		password: z.string().min(3).max(30),
	});

	const parsedRequestBody = requestBody.safeParse(req.body);

	if (!parsedRequestBody.success) {
		return res.status(411).json({
			message: 'Incorrect inputs',
		});
	}

	const { username, password } = req.body;

	try {
		const user = await User.findOne({
			username,
		});

		if (!user) {
			return res.status(403).json({
				message: 'User not found',
			});
		}

		const matchPasswrod = await bcrypt.compare(password, user.password);

		if (user && matchPasswrod) {
			const token = jwt.sign(
				{
					id: user._id.toString(),
				},
				String(process.env.JWT_SECRET),
			);

			res.status(200).json({
				token,
				message: 'User logged in successfully',
			});
		}

		res.status(411).json({
			message: 'Incorrect inputs',
		});
	} catch (error) {
		console.log('Error in logging in the user', error);
		return res.status(500).json({
			message: 'Internal server error',
			error,
		});
	}
});

export default userRouter;
