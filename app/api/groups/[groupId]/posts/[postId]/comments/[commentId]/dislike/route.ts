import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/app/_utils/db";


export async function POST(req: NextRequest, { params }) {
  const { commentId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    // Check if the user has already liked the comment
    const existingLike = await db.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

    // If the user has already liked the comment, remove the like and add a dislike
    if (existingLike) {
      await db.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      await db.commentDislike.create({
        data: {
          userId: userId,
          commentId: Number(commentId),
        },
      });
    } else {
      // Check if the user has already disliked the comment
      const existingDislike = await db.commentDislike.findFirst({
        where: {
          userId: userId,
          commentId: Number(commentId),
        },
      });

      // If the user has already disliked the comment, remove the dislike
      if (existingDislike) {
        await db.commentDislike.delete({
          where: {
            id: existingDislike.id,
          },
        });
      } else {
        await db.commentDislike.create({
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
