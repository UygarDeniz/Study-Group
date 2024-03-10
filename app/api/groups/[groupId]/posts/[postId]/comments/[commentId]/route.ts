import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }) {
  const { groupId, postId, commentId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

    if (existingLike) {
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.commentLike.create({
        data: {
          userId: userId,
          commentId: Number(commentId),
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
