import "dotenv/config";
import connectDB from "./db/index.js";
import app from "./app.js";

const requiredEnvVars = [
    "MONGODB_URI_DEV", 
    "MONGODB_URI_TEST", 
    "MONGODB_URI_PROD", 
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "CORS_ORIGIN",
    "NODE_ENV",
];

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`Error: Missing required environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1);
}

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT,"0.0.0.0", () => {
        console.log(`Server is running on port: ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    })
})
.catch((error) => {
    console.log("Startup failed: ",error);
    process.exit(1);
})

process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully...");
    process.exit(0);
});