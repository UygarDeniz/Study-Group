"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"

const prisma = new PrismaClient();

export default async function createGroup(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const group = await prisma.group.create({
    data: {
      name,
      description,
    },
  });
  revalidatePath("/groups");
  redirect(`/groups/${group.id}`);
}

export async function createPost(groupId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const session = await getServerSession(options);
  const authorId = session.user.id;
  console.log("authorId", session);
  const post = await prisma.post.create({
    data: {
      title,
      content: content.trim(),
      groupId: Number(groupId),

      authorId: authorId,
    },
  });
  revalidatePath(`/groups/${groupId}`);
  redirect(`/groups/${groupId}/posts/${post.id}`);
}

export async function createComment(postId: string, groupId: string, formData : FormData) {
  const content = formData.get("comment") as string;
  const session = await getServerSession(options);
  const authorId = session.user.id;

  const comment = await prisma.comment.create({
    data: {
      content,
      postId: Number(postId),
      authorId: authorId,
    },
  });
  
  revalidatePath(`/groups/${groupId}/posts/${postId}`);
}
