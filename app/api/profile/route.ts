import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/app/_utils/db";

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "No session" }, { status: 401 });
    }
    const user = session.user;

    const profile = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        email: true,
        bio: true,
        avatar: true,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(options);
    const user = session?.user;
    const body = await req.json();

    if (!body.name || !body.email || !body.bio) {
      return NextResponse.json(
        { message: "Missing name, email, or bio" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
        email: body.email,
        bio: body.bio,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
