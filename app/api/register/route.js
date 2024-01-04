import connnectDB from "@/app/config/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { username, email, password, comfirmpassword } = await request.json();
  if (password !== comfirmpassword) {
    return new NextResponse(
      JSON.stringify({ error: "password do not match" }, { status: 400 })
    );
  }

  await connnectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User successfully registered", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
