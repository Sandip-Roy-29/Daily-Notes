import request from 'supertest'; 
import app from '../../../src/app';
import { User } from "../../../src/models/user.model";

export const getAuthSetup = async (
    username="testuser", 
    email="test@gmail.com",
    password="SecurePass123") => {
    const user = await User.create({
        username,
        email,
        password
    })

    const loginRes = await request(app)
        .post("/api/v1/users/login")
        .send({
            identifier: email,
            password: password
        })

    const cookies = loginRes.headers["set-cookie"];

    return { cookies, userId: user._id };
}