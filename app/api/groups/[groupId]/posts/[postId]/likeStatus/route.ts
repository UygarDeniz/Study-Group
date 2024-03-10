import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }) {
  const { postId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    const existingLike = await prisma.postLike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
      },
    });

    const existingDislike = await prisma.postDislike.findFirst({
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
