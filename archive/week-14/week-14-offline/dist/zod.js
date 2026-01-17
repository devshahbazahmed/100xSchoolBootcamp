"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express = require('express');
const app = express();
// Define the schema for profile update
const userProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name cannot be empty' }),
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    age: zod_1.z
        .number()
        .min(18, { message: 'You must be at least 18 years old' })
        .optional(),
});
app.put('/user', (req, res) => {
    const { success } = userProfileSchema.safeParse(req.body);
    const updateBody = req.body; // how to assign a type to updateBody?
    if (!success) {
        res.status(411).json({});
        return;
    }
    // update database here
    res.json({
        message: 'User updated',
    });
});
app.listen(3000);
