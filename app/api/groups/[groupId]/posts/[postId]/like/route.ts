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

    const existingDislike = await prisma.postDislike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
      },
    });

    if (existingDislike) {
      await prisma.postDislike.delete({
        where: {
          id: existingDislike.id,
        },
      });

      await prisma.postLike.create({
        data: {
          userId: userId,
          postId: Number(postId),
        },
      });
    } else {
      const existingLike = await prisma.postLike.findFirst({
        where: {
          userId: userId,
          postId: Number(postId),
        },
      });

      if (existingLike) {
        await prisma.postLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        await prisma.postLike.create({
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
