import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest, { params }) {
  const prisma = new PrismaClient();
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page"));
  const pageSize = 3;
  const { groupId, postId } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        Comment: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
            CommentDislike: true,
            CommentLike: true,
          },
          skip: page > 1 ? (page - 1) * pageSize : 0,
          take: pageSize,
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
