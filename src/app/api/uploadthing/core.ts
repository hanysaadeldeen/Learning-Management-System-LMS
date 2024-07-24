import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuht = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unAuthorized");
  }
  return { userId };
};
export const ourFileRouter = {
  CourseImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => handleAuht())
    .onUploadComplete(() => {}),
  couresAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuht())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileSize: "512GB" } })
    .middleware(() => handleAuht())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
