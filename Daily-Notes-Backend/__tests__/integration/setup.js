import mongoose from "mongoose";
import { User } from "../../src/models/user.model";
import { Note } from "../../src/models/notes.model";
import "dotenv/config";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});
beforeEach(async () => {
  await User.deleteMany({});
  await Note.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
});