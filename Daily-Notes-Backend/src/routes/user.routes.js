import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser,updateAccountDetails, deleteAccount } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.get("/health", (_, res) => {
    res.status(200).json({ 
        success: true,
        message: "User routes are healthy!",
        timestamp: new Date().toISOString()
    });
});

router.route("/register").post(authLimiter, registerUser);
router.route("/login").post(authLimiter, loginUser);
router.route("/logout").post(logoutUser);

// secured routes
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, authLimiter, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-credentials").put(verifyJWT, updateAccountDetails);
router.route("/delete").delete(verifyJWT, deleteAccount);

export default router;