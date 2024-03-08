import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId: number = session.user.id;
  const groupId = params.id;

  try {
    const existingMembership = await prisma.groupMember.findFirst({
      where: {
        userId: userId,
        groupId: Number(groupId),
      },
    });

    if (existingMembership) {
      return NextResponse.json({ error: "User is already a member of this group" });
    }

    const newMembership = await prisma.groupMember.create({
      data: {
        userId: session.user.id,
        groupId: Number(groupId),
      },
    });

    return NextResponse.json({ userId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join group" }, { status: 500 });
  }
}