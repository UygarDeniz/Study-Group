import { db } from "@/app/_utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


export async function DELETE(req: NextRequest, { params }) {
  const { groupId, adminId } = params;
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
        GroupAdmin: {
          include: {
            User: {
              select: {
                id: true,
              },
            },
          },
        },
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

    // Check if the user is demoting themselves
    if (group.GroupAdmin.length === 1) {
      return NextResponse.json(
        { message: "You cannot demote the last admin" },
        { status: 400 }
      );
    }

    // Check if the admin to be demoted is an admin
    const isGroupAdmin = group.GroupAdmin.some(
      (admin) => admin.userId === Number(adminId)
    );
    if (!isGroupAdmin) {
      return NextResponse.json(
        { message: "The user is not an admin of the group" },
        { status: 400 }
      );
    }
    // Demote the admin
    await db.groupAdmin.deleteMany({
      where: {
        groupId: Number(groupId),
        userId: Number(adminId),
      },
    });
    return NextResponse.json({ message: "Admin demoted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}



