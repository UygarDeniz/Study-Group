import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";



export async function POST(req: NextRequest, { params }) {
  const { groupId, postId, commentId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    const existingLike = await db.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

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

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
