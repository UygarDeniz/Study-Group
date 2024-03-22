import { db } from "@/app/_utils/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest, { params }) {
  const session = await getServerSession(options);
  if (!session) {
    console.log("no session");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId: number = session.user.id;
  const groupId = params.groupId;

  try {
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

    return NextResponse.json({ userId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to join group" },
      { status: 500 }
    );
  }
}
