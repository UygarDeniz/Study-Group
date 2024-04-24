import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { db } from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const conversations = await db.conversation.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        Message: true,
        users: true,
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id;
    const data = await req.json();
    const to = data.to;

    const user1 = await db.user.findUnique({ where: { id: currentUserId } });
    const user2 = await db.user.findUnique({ where: { id: to } });

    if (!user1 || !user2) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUserId }, { id: to }],
        },
      },
    });

    return NextResponse.json({ newConversation }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
