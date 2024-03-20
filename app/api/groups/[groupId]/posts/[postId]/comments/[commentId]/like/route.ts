import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";



export async function POST(req: NextRequest, { params }) {
  const { commentId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    // Check if the user has already disliked the comment
    const existingDislike = await db.commentDislike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

    // If the user has already disliked the comment, remove the dislike and add a like
    if (existingDislike) {
      await db.commentDislike.delete({
        where: {
          id: existingDislike.id,
        },
      });
      await db.commentLike.create({
        data: {
          userId: userId,
          commentId: Number(commentId),
        },
      });
    } else {
      // Check if the user has already liked the comment
      const existingLike = await db.commentLike.findFirst({
        where: {
          userId: userId,
          commentId: Number(commentId),
        },
      });

      // If the user has already liked the comment, remove the like
      if (existingLike) {
        await db.commentLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        await db.commentLike.create({
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