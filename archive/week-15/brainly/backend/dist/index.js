"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const shareRoutes_1 = __importDefault(require("./routes/shareRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/user', userRoutes_1.default);
app.use('/api/v1/content', contentRoutes_1.default);
app.use('/api/v1/brain/', shareRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
});
