import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(options);
  if (!session) {
    return { status: 401, body: { error: "Unauthorized" } };
  }
  const user = session.user;

  const { conversationId } = params;
  try {
    const foundConversation = await db.conversation.findUnique({
      where: { id: Number(conversationId) },
    });
    if (!foundConversation) {
      return { status: 404, body: { error: "Conversation not found" } };
    }

    const data = await req.json();
    const { message, recipientId } = data;

    if (!message || !recipientId) {
      return { status: 400, body: { error: "Invalid request" } };
    }

    const newMessage = await db.message.create({
      data: {
        content: message,
        senderId: user.id,
        conversationId: foundConversation.id,
      },
    });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
