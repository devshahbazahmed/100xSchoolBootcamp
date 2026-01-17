import { Router, Request, Response } from 'express';
import { userMiddleware } from '../middleware/middleware';
import { Content, LinkModel, User } from '../db';
import { random } from '../utils';

const brainShareRouter = Router();

brainShareRouter.post(
	'/share',
	userMiddleware,
	async (req: Request, res: Response) => {
		try {
			const { share } = req.body;
			if (share) {
				const existingLink = await LinkModel.findOne({
					//@ts-ignore
					userId: req.userId,
				});

				if (existingLink) {
					return res.status(200).json({
						hash: existingLink.hash,
					});
				}

				const hash = random(10);
				const newLink = await LinkModel.create({
					//@ts-ignore
					userId: req.userId,
					hash,
				});

				return res.status(200).json({
					hash,
					message: 'Link created successfully',
				});
			} else {
				await LinkModel.deleteOne({
					//@ts-ignore
					userId: req.userId,
				});

				return res.status(200).json({
					message: 'Link removed successfully',
				});
			}
		} catch (error) {
			console.log('Cannot share the link', error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	},
);

brainShareRouter.get(
	'/:shareLink',
	userMiddleware,
	async (req: Request, res: Response) => {
		try {
			const hash = req.params.shareLink;

			const link = await LinkModel.findOne({
				hash,
			});

			if (!link) {
				return res.status(411).json({
					message: 'Invalid link',
				});
			}

			const content = await Content.findOne({
				userId: link.userId,
			});

			if (!content) {
				return res.status(404).json({
					message: 'Content not found',
				});
			}

			const user = await User.findOne({
				userId: link.userId,
			});

			if (!user) {
				return res.status(404).json({
					message: 'User not found',
				});
			}

			return res.status(200).json({
				username: user.username,
				content,
			});
		} catch (error) {
			console.log('Cannot fetch the content', error);
			return res.status(500).json({
				message: 'Internal server error',
			});
		}
	},
);

export default brainShareRouter;
