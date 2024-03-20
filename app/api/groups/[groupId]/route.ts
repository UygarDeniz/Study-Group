import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


export async function GET(
  req: NextRequest,

  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const includePosts = searchParams.get("includePosts");
  const sort = searchParams.get("sort");
  
  const pageSize = 6;
  const foundGroup = await db.group.findUnique({
    where: {
      id: Number(groupId),
    },
    include: {
      Post:
        includePosts === "true"
          ? {
              include: {
                PostLike: true,
                PostDislike: true,
              },
              take: pageSize,
              skip: page > 1 ? (page - 1) * pageSize : 0,
            }
          : false,
    },
  });

  return NextResponse.json({ group: foundGroup });
}

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(options);
  const userId: number = session.user.id;
  const { groupId } = params.id;

  const existingMembership = await db.groupMember.findFirst({
    where: {
      userId: userId,
      groupId: Number(groupId),
    },
  });

  if (existingMembership) {
    return NextResponse.json({
      error: "User is already a member of this group",
    });
  }
  const newMembership = await db.groupMember.create({
    data: {
      userId: session.user.id,
      groupId: Number(groupId),
    },
  });

  return NextResponse.json({ userId });
}
