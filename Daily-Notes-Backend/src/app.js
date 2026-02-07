import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded());
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js"
import notesRouter from "./routes/notes.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", notesRouter);

// error middleware
app.use(errorHandler)

export default app;