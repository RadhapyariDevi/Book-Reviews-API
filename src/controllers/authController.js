import express from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Username, email, password are required.",
    });
  }

  const existUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existUser) {
    return res.status(401).json({
      success: false,
      message:
        existUser.email === email
          ? "Email already registered"
          : "Username already taken",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });

};

const login = async (req, res) => {
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Username, email, password are required.",
    });
  }

  const existUser = await prisma.user.findUnique({
    where: {email},
  });

  if (!existUser) {
    return res.status(401).json({
      success: false,
      message: "invalid email or password"
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "invalid email or password"
    });
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {

};

const getMe = async (req, res) => {

}

export {signup, login, logout, getMe}
