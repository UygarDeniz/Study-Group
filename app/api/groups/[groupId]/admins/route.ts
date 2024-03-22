import { db } from "@/app/_utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req: NextRequest, { params }) {
  const { groupId } = params;
  const data = await req.json();

  const userId = data.userId;
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ message: "No session" }, { status: 401 });
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

    // If the group is not found
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    // Check if the user is an admin
    const isAdmin = group.GroupAdmin.some((admin) => admin.userId === user.id);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if the user is already an admin
    const isAlreadyAdmin = group.GroupAdmin.some(
      (admin) => admin.userId === Number(userId)
    );
    if (isAlreadyAdmin) {
      return NextResponse.json(
        { message: "User is already an admin" },
        { status: 400 }
      );
    }

    // Add the user to the groupAdmin collection
    await db.groupAdmin.create({
      data: {
        userId: Number(userId),
        groupId: Number(groupId),
      },
    });

    return NextResponse.json(
      { message: "User promoted to admin" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }) {
  const { groupId } = params;
  const data = await req.json();
  const userId = data.userId;
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

    // If the group is not found
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    // Check if the user is an admin
    const isAdmin = group.GroupAdmin.some((admin) => admin.userId === user.id);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Remove the user from the groupAdmin collection
    await db.groupAdmin.deleteMany({
      where: {
        groupId: Number(groupId),
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      { message: "User removed from admin" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
