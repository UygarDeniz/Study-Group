import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { user } = await getServerSession(options);
    const profile = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        email: true,
        bio: true,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getServerSession(options);
    const body = await req.json();

    if (!body.name || !body.email || !body.bio) {
      return NextResponse.json({ message: "Missing name, email, or bio" }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
        email: body.email,
        bio: body.bio,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
  }
}