import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("file url", file.url);
  }),
  tracksAudio: f({
    audio: { maxFileSize: "64MB", maxFileCount: 20 },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("track url", file.url);
  }),
  trackImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("image url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
