import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
