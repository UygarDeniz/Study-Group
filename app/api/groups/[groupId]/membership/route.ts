import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


export async function GET(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  const session = await getServerSession(options);
  
  if (!session) {
    return NextResponse.json({ isMember: false });
  }
  const userId: number = session.user.id;
  const groupId = params.groupId;

  const membership = await db.groupMember.findFirst({
    where: {
      userId: userId,
      groupId: Number(groupId),
    },
  });
  
  return NextResponse.json({ isMember: Boolean(membership) });
}
