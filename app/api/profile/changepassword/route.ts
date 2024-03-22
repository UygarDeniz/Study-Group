import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "No session" }, { status: 401 });
    }
    const user = session?.user;

    const body = await req.json();

    if (!body.password || !body.newPassword) {
      return NextResponse.json(
        { message: "Missing password or new password" },
        { status: 400 }
      );
    }

    const profile = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        password: true,
      },
    });

    const match = await bcrypt.compare(body.password, profile.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(body.newPassword, 10);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
