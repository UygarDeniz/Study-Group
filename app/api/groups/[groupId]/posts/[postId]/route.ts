import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";

export async function GET(req: NextRequest, { params }) {

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page"));
  const pageSize = 3;
  const { groupId, postId } = params;

  try {
    const post = await db.post.findUnique({
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
                avatar: true,
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
