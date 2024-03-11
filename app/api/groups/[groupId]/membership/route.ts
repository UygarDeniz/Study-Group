import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

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

  const membership = await prisma.groupMember.findFirst({
    where: {
      userId: userId,
      groupId: Number(groupId),
    },
  });
  console.log(Boolean(membership));
  return NextResponse.json({ isMember: Boolean(membership) });
}
