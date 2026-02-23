import { Contact } from '../models/contact.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMail } from '../utils/sendMail.js';

const sendMessage = asyncHandler(async (req, res) => {

  const { type, subject, message } = req.body;

  // Validate input safely
  if (!subject?.trim() || !message?.trim() ) {
    throw new ApiError(400, 'Subject and message are required');
  }

  // Get user from auth middleware (DON'T trust frontend userId)
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Save message to database first (important)
  const contact = await Contact.create({
    userId: userId,
    type,
    email: user.email,
    subject: subject.trim(),
    message: message.trim(),
  });

  if (!contact) {
    throw new ApiError(500, 'Failed to save message');
  }

  // Try sending email (do not break system if it fails)
  try {
    await sendMail({
      name: user.username,
      email: user.email,
      type: type.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
  } catch (error) {
    console.error('Email sending failed:', error.message);
    // We do NOT throw error here because message is already saved
  }

  // Send success response
  return res
    .status(201)
    .json(new ApiResponse(201, contact, 'Message received successfully'));
});

export { sendMessage };
