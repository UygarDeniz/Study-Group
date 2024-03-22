import { db } from "@/app/_utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function DELETE(req: NextRequest, { params }) {
  const { groupId, memberId } = params;
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = session.user;

  try {
    // Fetch the group from the database
    const group = await db.group.findUnique({
      where: { id: Number(groupId) },
      include: {
        GroupAdmin: true,
        GroupMember: true,
      },
    });
    //if the group is not found
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    // Check if the user is an admin
    const isAdmin = group.GroupAdmin.some((admin) => admin.userId === user.id);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if the member to be removed is a member of the group
    const member = await db.groupMember.findFirst({
      where: {
        groupId: Number(groupId),
        userId: Number(memberId),
      },
    });
    if (!member) {
      return NextResponse.json(
        { message: "The user is not a member of the group" },
        { status: 400 }
      );
    }
    // Remove the member
    await db.groupMember.deleteMany({
      where: {
        groupId: Number(groupId),
        userId: Number(memberId),
      },
    });
    return NextResponse.json({ message: "Member removed" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
