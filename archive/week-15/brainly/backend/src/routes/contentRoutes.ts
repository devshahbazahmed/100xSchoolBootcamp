import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { userMiddleware } from '../middleware/middleware';
import { Content } from '../db';

const contentRouter = Router();

contentRouter.post('/', userMiddleware, async (req: Request, res: Response) => {
	const requestBody = z.object({
		link: z.string().min(3).max(30),
		title: z.string().min(3).max(30),
		type: z.string().min(3).max(30),
	});

	const parsedRequestBody = requestBody.safeParse(req.body);

	if (!parsedRequestBody.success) {
		return res.status(411).json({
			message: 'Incorrect Inputs',
		});
	}

	const { link, type, title } = req.body;

	try {
		const newContent = await Content.create({
			link,
			type,
			title,
			//@ts-ignore
			userId: req.userId,
			tags: [],
		});

		return res.status(201).json({
			message: 'New Content added',
			newContent,
		});
	} catch (error) {
		console.log('Error in adding the content', error);
		return res.status(500).json({
			message: 'Error in adding the content',
			error,
		});
	}
});

contentRouter.get('/', userMiddleware, async (req: Request, res: Response) => {
	try {
		//@ts-ignore
		const userId = req.userId;
		const allContents = await Content.find({
			usreId: userId,
		}).populate('userId');
		res.status(200).json({
			content: allContents,
		});
	} catch (error) {
		console.log('Error in fetching all contents', error);
		return res.status(500).json({
			message: 'Error in fetching all contents',
			error,
		});
	}
});

contentRouter.delete('/', userMiddleware, async (req: Request, res: Response) => {
	try {
			const contentId = req.body.contentId;
			await Content.deleteMany({
				contentId,
				//@ts-ignore
				userId: req.userId,
			});

			return res.status(200).json({
				message: 'Content deleted successfully',
				contentId,
			});
		} catch (error) {
			console.log('Error in deleting the content', error);
			return res.status(403).json({
				message: 'Cannot delete the document you do not own',
			});
		}
	},
);

export default contentRouter;
