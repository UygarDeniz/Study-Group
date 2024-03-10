import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }) {
  const { postId } = params;

  try {
    const session = await getServerSession(options);
    const userId: number = session.user.id;

    // Check if the user has already liked the post
    const existingLike = await prisma.postLike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
      },
    });

    // If the user has already liked the post, remove the like and add a dislike
    if (existingLike) {
      await prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      await prisma.postDislike.create({
        data: {
          userId: userId,
          postId: Number(postId),
        },
      });
    } else {
      // Check if the user has already disliked the post
      const existingDislike = await prisma.postDislike.findFirst({
        where: {
          userId: userId,
          postId: Number(postId),
        },
      });

      // If the user has already disliked the post, remove the dislike
      if (existingDislike) {
        await prisma.postDislike.delete({
          where: {
            id: existingDislike.id,
          },
        });
      } else {
        await prisma.postDislike.create({
          data: {
            userId: userId,
            postId: Number(postId),
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