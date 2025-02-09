"use server"
import {prisma} from "@/libs/prisma";

export async function runTransaction(queries: any[]) {
  try {
    return await prisma.$transaction(queries);
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}
