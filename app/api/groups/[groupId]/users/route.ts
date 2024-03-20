import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
export async function GET(req: NextRequest, { params }) {
  const { groupId } = params;
  try {
    const group = await db.group.findUnique({
      where: { id: Number(groupId) },
      include: {
        GroupMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        GroupAdmin: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
