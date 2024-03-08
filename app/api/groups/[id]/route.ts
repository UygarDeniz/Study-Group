import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();
export async function GET(
  res: NextResponse,

  { params }: { params: { id: string } }
) {
  const { id } = params;

  const foundGroup = await prisma.group.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      posts: true,
    },
  });

  return NextResponse.json({ group: foundGroup });
}

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(options);
  const userId: number = session.user.id;
  const { groupId } = params.id;

  const existingMembership = await prisma.groupMember.findFirst({
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
  const newMembership = await prisma.groupMember.create({
    data: {
      userId: session.user.id,
      groupId: Number(groupId),
    },
  });

  return NextResponse.json({ userId });
}
