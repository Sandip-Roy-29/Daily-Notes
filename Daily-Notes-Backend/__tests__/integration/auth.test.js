import request from 'supertest'; // Send fake HTTP request to the app
import app from '../../src/app.js'; // My express app (without starting server)
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import "./setup.js";
import { getAuthSetup } from './utils/auth.util.js';
import { User } from "../../src/models/user.model";


describe('User Registration', () => {
  test('should register a new user with valid credentials', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.username).toBe('testuser');
    expect(response.body.data.password).toBeUndefined();
  });

  test('should failed on duplicate email', async () => {
    await request(app).post('/api/v1/users/register').send({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });

    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
  });

  test('should failed on less than 8 character password', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: 'test@gmail.com',
      password: 'Secure8',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing one capital letter in password', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: 'test@gmail.com',
      password: 'secure88',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing one number in password', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: 'test@gmail.com',
      password: 'securePass',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing password', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: 'test@gmail.com',
      password: '',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing username', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: '',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing email', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      username: 'testuser2',
      email: '',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('User Login', () => {
  beforeEach(async () => {
    await User.create({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });
  });

  test('should login a user with valid email', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'test@gmail.com',
      password: 'SecurePass123',
    });

    expect(response.headers['set-cookie']).toBeDefined();
    const cookies = response.headers['set-cookie'];
    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith('accessToken=')
    );
    const refreshCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken=')
    );

    expect(accessCookie).toBeDefined();
    expect(refreshCookie).toBeDefined();
    expect(accessCookie).toContain('HttpOnly');
    expect(accessCookie).toContain('Path=/');
    expect(accessCookie).toContain('SameSite=Strict');
    if (process.env.NODE_ENV === 'production')
      expect(accessCookie).toContain('Secure');
    expect(refreshCookie).toContain('HttpOnly');
    expect(refreshCookie).toContain('Path=/');
    expect(refreshCookie).toContain('SameSite=Strict');
    if (process.env.NODE_ENV === 'production')
      expect(refreshCookie).toContain('Secure');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should login a user with valid username', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'testuser',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should failed on invalid email', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'testuser@gmail.com',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test('should failed on invalid username', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'testuser1',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test('should failed on invalid password', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'testuser',
      password: 'SecurePass1234',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing email or username', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: '',
      password: 'SecurePass123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should failed on not containing password', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      identifier: 'testuser',
      password: '',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('User Logout', () => {
  let cookies;
  let user;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    cookies = authData.cookies;
  });

  test('Should logout successfully', async () => {
    const response = await request(app)
      .post('/api/v1/users/logout')
      .set('Cookie', cookies);

    user = await User.findOne({ email: 'test@gmail.com' });
    const clearedCookies = response.headers['set-cookie'];

    expect(clearedCookies).toBeDefined();

    const cleardAccessCookie = clearedCookies.find((cookie) =>
      cookie.startsWith('accessToken=')
    );
    const cleardRefreshCookie = clearedCookies.find((cookie) =>
      cookie.startsWith('refreshToken=')
    );

    expect(cleardAccessCookie).toContain('accessToken=;');
    expect(cleardRefreshCookie).toContain('refreshToken=;');
    expect(user.refreshToken).toBeUndefined();
    expect(response.statusCode).toBe(200);
  });

  test('should logout failed without token', async () => {
    const response = await request(app).post('/api/v1/users/logout');

    expect(response.statusCode).toBe(401);
  });
});

describe('Protected Routes', () => {
  let cookies;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    cookies = authData.cookies;
  });

  test('should access protected route with valid token', async () => {
    const response = await request(app)
      .get('/api/v1/users/current-user')
      .set('Cookie', cookies);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('test@gmail.com');
  });

  test('should failed with invalid token', async () => {
    const response = await request(app)
      .get('/api/v1/users/current-user')
      .set('Cookie', ['accessToken=invalitoken', 'refreshToken=invalidtoken']);

    expect(response.statusCode).toBe(401);
  });
});

describe('User password change', () => {
  let cookies;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    cookies = authData.cookies;
  });

  test('should password change with valid crendentials', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass1234',
        confirmPassword: 'SecurePass1234',
      });

    const response2 = await request(app).post('/api/v1/users/login').send({
      identifier: 'test@gmail.com',
      password: 'SecurePass1234',
    });

    expect(response1.statusCode).toBe(200);
    expect(response2.statusCode).toBe(200);
    expect(response2.headers['set-cookie']).toBeDefined();
  });

  test('should password not change with less than 8 character new password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'Secure1',
        confirmPassword: 'Secure1',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change without a upper case later in new password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'securepass123',
        confirmPassword: 'securepass123',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change without a number in new password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass',
        confirmPassword: 'SecurePass',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change without current password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: '',
        newPassword: 'SecurePass1234',
        confirmPassword: 'SecurePass1234',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change with invalid current password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass12',
        newPassword: 'SecurePass1234',
        confirmPassword: 'SecurePass1234',
      });

    expect(response1.statusCode).toBe(401);
  });

  test('should password not change with same current password and new password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass123',
        confirmPassword: 'SecurePass123',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change with new password and different confirm password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass1234',
        confirmPassword: 'SecurePass12345',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change without confirm password', async () => {
    const response1 = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', cookies)
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass1234',
        confirmPassword: '',
      });

    expect(response1.statusCode).toBe(400);
  });

  test('should password not change with invalid token', async () => {
    const response = await request(app)
      .post('/api/v1/users/change-password')
      .set('Cookie', ['accessToken=invalidtoken', 'refreshToken=invalidtoken'])
      .send({
        currentPassword: 'SecurePass123',
        newPassword: 'SecurePass1234',
        confirmPassword: 'SecurePass1234',
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('User account details change', () => {
  let cookies;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    cookies = authData.cookies;
  });

  test('should username changed ', async () => {
    const response = await request(app)
      .put('/api/v1/users/update-credentials')
      .set('Cookie', cookies)
      .send({
        username: 'testuser2',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.username).toBe('testuser2');
  });

  test('should username not change with same username ', async () => {
    const response = await request(app)
      .put('/api/v1/users/update-credentials')
      .set('Cookie', cookies)
      .send({
        username: 'testuser',
      });
    expect(response.statusCode).toBe(400);
  });

  test('should username not change without username ', async () => {
    const response = await request(app)
      .put('/api/v1/users/update-credentials')
      .set('Cookie', cookies)
      .send({
        username: '',
      });
    expect(response.statusCode).toBe(400);
  });

  test('should username not change with invalid token', async () => {
    const response = await request(app)
      .put('/api/v1/users/update-credentials')
      .set('Cookie', ['accessToken=invalidtoken', 'refreshToken=invalidtoken'])
      .send({
        username: 'testuser2',
      });
    expect(response.statusCode).toBe(401);
  });
});

describe('User deletion', () => {
  let cookies;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    cookies = authData.cookies;
  });

  test('should user delete', async () => {
    const response = await request(app)
      .delete('/api/v1/users/delete')
      .set('Cookie', cookies);

    expect(response.statusCode).toBe(200);
  });

  test('should user not delete with invalid token', async () => {
    const response = await request(app)
      .delete('/api/v1/users/delete')
      .set('Cookie', ['accessToken=invalidtoken', 'refreshToken=invalidtoken']);

    expect(response.statusCode).toBe(401);
  });
});

describe('Expired JWT', () => {
  let expiredToken;
  beforeEach(async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'SecurePass123',
    });

    expiredToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '-10s' } // already expired
    );
  });

  test('should fail with expired access token', async () => {
    const response = await request(app)
      .get('/api/v1/users/current-user')
      .set('Cookie', [`accessToken=${expiredToken}`]);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

describe('Token refresh', () => {
  let oldCookies;
  let oldRefresh;

  beforeEach(async () => {
    const authData = await getAuthSetup();
    oldCookies = authData.cookies;

    expect(oldCookies).toBeDefined();
    oldRefresh = oldCookies.find((c) => c.startsWith('refreshToken='));
  });

  test('should rotate refresh token', async () => {
    const refreshRes = await request(app)
      .post('/api/v1/users/refresh-token')
      .set('Cookie', oldCookies);

    const newCookies = refreshRes.headers['set-cookie'];
    expect(newCookies).toBeDefined();
    const newRefresh = newCookies.find((c) => c.startsWith('refreshToken='));

    expect(newRefresh).toBeDefined();
    expect(newRefresh).not.toEqual(oldRefresh);
  });

  test('should delete refresh token reuse', async () => {
    await request(app)
      .post('/api/v1/users/refresh-token')
      .set('Cookie', oldCookies);

    const reuseRes = await request(app)
      .post('/api/v1/users/refresh-token')
      .set('Cookie', oldCookies);

    expect(reuseRes.statusCode).toBe(403);
  });
});
