import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";


import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

