import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import '../setup';

jest.unstable_mockModule('../../../src/utils/sendMail.js', () => ({
  sendMail: jest.fn().mockResolvedValue(),
}));

const { sendMail } = await import('../../../src/utils/sendMail.js');
import { User } from '../../../src/models/user.model.js';
import { Contact } from '../../../src/models/contact.model.js';
import app from '../../../src/app.js';

describe('Contact', () => {
  let cookies;
  beforeEach(async () => {
    await User.create({
      username: 'test',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });

    const loginRes = await request(app).post('/api/v1/users/login').send({
      identifier: 'test@gmail.com',
      password: 'SecurePass123',
    });

    cookies = loginRes.headers['set-cookie'];
  });

  test('should save contact message and return 201', async () => {
    const response = await request(app)
      .post('/api/v1/contact')
      .set('Cookie', cookies)
      .send({
        type: 'support',
        subject: 'Need help',
        message: 'Hello there',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    const savedContact = await Contact.findOne({ subject: 'Need help' });

    expect(savedContact).not.toBeNull();
    expect(savedContact.message).toBe('Hello there');
  });

  test("should return 401 if user is not authenticated", async () => {
    const response = await request(app)
      .post("/api/v1/contact")
      .send({
        type: "support",
        subject: "Need help",
        message: "Hello"
      })

      expect(response.statusCode).toBe(401);
  })
  
  test("should return 400 if subject is missing", async () => {
    const response = await request(app)
      .post("/api/v1/contact")
      .set("Cookie", cookies)
      .send({
        type: "support",
        subject: "",
        message: "Hello"
      })

      expect(response.statusCode).toBe(400);
  })
  
  test("should return 400 if message is missing", async () => {
    const response = await request(app)
      .post("/api/v1/contact")
      .set("Cookie", cookies)
      .send({
        type: "support",
        subject: "Need help",
        message: ""
      })

      expect(response.statusCode).toBe(400);
  })
});
