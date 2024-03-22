import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/app/_utils/db";
import { utapi } from "@/app/_utils/utapi";
import { NextRequest } from "next/server";

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(options);
  return session?.user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePicture: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await auth();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const foundUser = await db.user.findUnique({
        where: { id: metadata.userId },
      });
      const oldUrl = foundUser.avatar;
      const fileKey = oldUrl.substring(oldUrl.lastIndexOf("/") + 1);
      await utapi.deleteFiles(fileKey);

      const user = await db.user.update({
        where: { id: metadata.userId },
        data: { avatar: file.url },
      });

      return { uploadedBy: metadata.userId };
    }),

  groupPicture: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
