"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brainShareRouter = (0, express_1.Router)();
brainShareRouter.post('/share', (req, res) => { });
brainShareRouter.get('/:shareLink', (req, res) => { });
exports.default = brainShareRouter;
