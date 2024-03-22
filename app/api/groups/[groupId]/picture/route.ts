import { db } from "@/app/_utils/db";
import { utapi } from "@/app/_utils/utapi";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }) {
  const { groupId } = params;
  const data = await req.json();

  const groupPicture = data.groupPicture;

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  const isAdmin = await db.groupMember.findFirst({
    where: {
      userId: user.id,
      groupId: Number(groupId),
    },
  });

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const oldGroup = await db.group.findUnique({
    where: {
      id: Number(groupId),
    },
  });

  const oldUrl = oldGroup.avatar;
  const fileKey = oldUrl.substring(oldUrl.lastIndexOf("/") + 1);
  await utapi.deleteFiles(fileKey);
  const group = await db.group.update({
    where: {
      id: Number(groupId),
    },
    data: {
      avatar: groupPicture,
    },
  });
  return NextResponse.json(group.avatar);
}
