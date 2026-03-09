import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import helmet from "helmet";
import morgan from "morgan";
import { limiter } from "./middlewares/rateLimiter.middleware.js";

const app = express();

// Security middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        }
    }
}));

const morganFormat = ":method :url :status :response-time ms";
if(process.env.NODE_ENV !== "test"){
    app.use(limiter);
    app.use(morgan(morganFormat));
}

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((allowedOrigin) =>
      origin.startsWith(allowedOrigin.trim())
    );

    callback(null, isAllowed);
  },
  credentials: true
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js"
import notesRouter from "./routes/notes.routes.js"
import contactRouter from "./routes/contact.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/contact", contactRouter);

// error middleware
app.use(errorHandler)

export default app;