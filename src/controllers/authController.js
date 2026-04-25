import express from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
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

    const token = generateToken(user, res);

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
  } catch (err) {
    next(err);
  }

};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Username, email, password are required.",
      });
    }

    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password"
      });
    }

    const token = generateToken(existUser, res);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: existUser.id,
        username: existUser.username,
        email: existUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  }
  catch (err) {
    next(err);
  }
}

export { signup, login, logout, getMe }
