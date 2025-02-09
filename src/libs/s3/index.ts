"use server";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { USER_ROLE } from "@/libs/constant";
import { createPresignedPost, PresignedPostOptions } from "@aws-sdk/s3-presigned-post";

const s3Client = new S3Client({region: process.env.AWS_REGION});

export const createPostURL = async (role: USER_ROLE, key: string, contentType: string) => {
  const config: PresignedPostOptions = {
    Bucket: (role === USER_ROLE.USER ? process.env.USER_BUCKET : process.env.ADMIN_BUCKET) ?? "",
    Key: key,
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
      ['starts-with', '$Content-Type', contentType],
    ],
    Fields: {
      acl: 'public-read',
      'Content-Type': contentType,
    },
  };
  try {
    return await createPresignedPost(s3Client, config);
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message
      };
    }
    return {
      error: 'An unknown error occurred'
    };
  }
};

export const putObject = async (file: Buffer, objectKey: string) => {
  const params = {
    Bucket: process.env.PRODUCT_BUCKET_NAME,
    Key: objectKey,
    Body: file,
  }
  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
  } catch (error) {
    throw error;
  }
}

export const getPresignedURL = async (objectKey: string | undefined) => {
  if(!objectKey) {
    return null;
  }
  return `https://${process.env.PRODUCT_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;
}
