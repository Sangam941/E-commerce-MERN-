import { AppError } from '../utils/appError';
import prisma from '../config/db';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/tokenGenerator';

// Register user service
export const registerUserService = async ({ email, password, role = 'CUSTOMER' }: any) => {
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }
  
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  
    return {
      message: "Registration successful",
      user: {
        user_id: newUser.id,
        role: newUser.role,
        email: newUser.email,
      },
    };
  };

// Login user service
export const loginUserService = async ({ email, password }: any) => {

  if (!email || !password) {
    throw new AppError("email and password are required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const token = await generateToken(tokenPayload)

  return {
    message: "Login successful",
    token,
    user: {
      user_id: user.id,
      role: user.role,
      email,
    },
  };
};

// Logout user service
export const logoutUserService = () => {
  return { message: "Logout successful" };
};

// Get user role service
export const getUserRoleService = async (userId: string) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return { role: user.role };
};
