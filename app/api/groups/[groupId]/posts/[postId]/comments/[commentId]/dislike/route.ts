import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }) {
  const { commentId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    // Check if the user has already liked the comment
    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

    // If the user has already liked the comment, remove the like and add a dislike
    if (existingLike) {
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      await prisma.commentDislike.create({
        data: {
          userId: userId,
          commentId: Number(commentId),
        },
      });
    } else {
      // Check if the user has already disliked the comment
      const existingDislike = await prisma.commentDislike.findFirst({
        where: {
          userId: userId,
          commentId: Number(commentId),
        },
      });

      // If the user has already disliked the comment, remove the dislike
      if (existingDislike) {
        await prisma.commentDislike.delete({
          where: {
            id: existingDislike.id,
          },
        });
      } else {
        await prisma.commentDislike.create({
          data: {
            userId: userId,
            commentId: Number(commentId),
          },
        });
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
