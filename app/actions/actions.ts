"use server";
import { db } from "@/app/_utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function createGroup(formData: FormData) {
  try {
    let name = formData.get("name") as string;
    name = name.trim();
    let description = formData.get("description") as string;
    description = description.trim();

    const session = await getServerSession(options);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const founderId = session.user.id;
    const group = await db.group.create({
      data: {
        name,
        description,
        GroupAdmin: {
          create: {
            userId: founderId,
          },
        },
      },
    });
    revalidatePath("/groups");
    redirect(`/groups/${group.id}`);
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}

export async function createPost(groupId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const session = await getServerSession(options);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const authorId = session.user.id;
    const post = await db.post.create({
      data: {
        title,
        content: content.trim(),
        groupId: Number(groupId),
        authorId: authorId,
      },
    });
    revalidatePath(`/groups/${groupId}`);
    redirect(`/groups/${groupId}/posts/${post.id}`);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function createComment(
  postId: string,
  groupId: string,
  formData: FormData
) {
  try {
    const content = formData.get("comment") as string;
    const session = await getServerSession(options);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const authorId = session.user.id;
    const comment = await db.comment.create({
      data: {
        content,
        postId: Number(postId),
        authorId: authorId,
      },
    });
    revalidatePath(`/groups/${groupId}/posts/${postId}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function changeUserSettings(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const session = await getServerSession(options);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
        bio,
      },
    });
    revalidatePath(`/profile`);
    redirect(`/profile`);
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
}

export const changeGroupsDetails = async (
  groupId: string,
  formData: FormData
) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    if (!name || !description) {
      throw new Error("Name and description are required");
    }

    const group = await db.group.update({
      where: {
        id: Number(groupId),
      },
      data: {
        name,
        description,
      },
    });

    revalidatePath(`/groups/${groupId}`);
  } catch (error) {
    console.error("Error updating group details:", error);
    throw error;
  }
};
