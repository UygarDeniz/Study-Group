import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/app/_utils/db";

export async function POST(req: NextRequest, { params }) {
  const { commentId } = params;

  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "No session" }, { status: 401 });
    }

    const userId: number = session.user.id;

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({message:"No user found"},{ status: 401 });
    }

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
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
