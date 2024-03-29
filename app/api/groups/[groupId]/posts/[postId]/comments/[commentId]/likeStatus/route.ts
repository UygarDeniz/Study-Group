import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: NextRequest, { params }) {
  const { commentId } = params;

  try {
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ likeStatus: "none" });
    }
    const userId: number = session.user.id;

    const existingLike = await db.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });

    const existingDislike = await db.commentDislike.findFirst({
      where: {
        userId: userId,
        commentId: Number(commentId),
      },
    });
    if (existingLike) {
      return NextResponse.json({ likeStatus: "like" });
    } else if (existingDislike) {
      return NextResponse.json({ likeStatus: "dislike" });
    }
    return NextResponse.json({ likeStatus: "none" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
