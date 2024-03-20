import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";



export async function GET(req: NextRequest, { params }) {
  const { postId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    const existingLike = await db.postLike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
      },
    });

    const existingDislike = await db.postDislike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
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
    return NextResponse.json({ status: 500 });
  }
}
