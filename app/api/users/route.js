
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export async function POST(req) {
  const body = await req.json();
  const prisma = new PrismaClient();
  if (!body.email || !body.password || !body.name) {
    return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
