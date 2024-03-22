import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";



export async function POST(req: NextRequest, { params }) {
  const { postId } = params;

  try {
    const session = await getServerSession(options);
    
    if (!session) {
      return NextResponse.json({ message: "No session" }, { status: 401 });
    }
    const userId: number = session.user.id;

    const existingDislike = await db.postDislike.findFirst({
      where: {
        userId: userId,
        postId: Number(postId),
      },
    });

    if (existingDislike) {
      await db.postDislike.delete({
        where: {
          id: existingDislike.id,
        },
      });

      await db.postLike.create({
        data: {
          userId: userId,
          postId: Number(postId),
        },
      });
    } else {
      const existingLike = await db.postLike.findFirst({
        where: {
          userId: userId,
          postId: Number(postId),
        },
      });

      if (existingLike) {
        await db.postLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        await db.postLike.create({
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
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
