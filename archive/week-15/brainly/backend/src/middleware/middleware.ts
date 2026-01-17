import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const userMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const header = req.headers['authorization'];
		console.log('Authorization Header:', header);

		if (!header || !header.startsWith('Bearer ')) {
			return res
				.status(401)
				.json({ message: 'Authorization header missing or malformed' });
		}

		const token = header.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Token missing' });
		}

		const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));

		if (decodedToken) {
			// @ts-ignore
			req.userId = decodedToken.id;
			next();
		} else {
			return res.status(403).json({
				message: 'You are not logged in',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: 'Internal server error',
		});
	}
};
