import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";

// Generate upload components from @uploadthing/react
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
export const Uploader = generateUploader();
