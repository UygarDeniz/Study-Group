import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/app/_utils/db";
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.password || !body.name) {
    return NextResponse.json(
      { message: "Please fill in all fields" },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await db.user.create({
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
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
