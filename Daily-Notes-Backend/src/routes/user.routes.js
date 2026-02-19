import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser,updateAccountDetails, deleteAccount } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

// secured routes
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-credentials").put(verifyJWT, updateAccountDetails);
router.route("/delete").delete(verifyJWT, deleteAccount);

export default router;