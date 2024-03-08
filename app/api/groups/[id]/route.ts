import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(
  res: NextResponse,

  { params }: { params: { id: string } }
) {
  const { id } = params;

  const prisma = new PrismaClient();

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
