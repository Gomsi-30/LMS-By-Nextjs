import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).onUploadComplete(() => {}),


    courseAttachment: f(["text", "image", "video", "audio", "pdf"]).onUploadComplete(() => {}),


    courseVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB"} }).onUploadComplete(() => {})
};
