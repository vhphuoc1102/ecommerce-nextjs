"use server"
import {FormState} from "@/libs/zod";
import {SignUpSchema} from "@/libs/zod";
import * as amsUserDao from "@/action/dao/ams/user.dao"
import {redirect} from "next/navigation";
import {generateFromEmail} from "unique-username-generator";
import {saltAndHashPassword} from "@/libs/utils";
import {userAuth} from "@/libs/auth";
import {AuthError} from "next-auth";

export const login
    = async (
        prevState: string | undefined,
        formData: FormData) => {
  try {
    await userAuth.signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
  }
}

export async function signup(
    state: FormState | undefined,
    formData: FormData
) {
  const validatedFields = await SignUpSchema.safeParseAsync({
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    verifyPassword: formData.get("verifyPassword") || ""
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const {email, password} = validatedFields.data;
  const hashedPassword = await saltAndHashPassword(password)

  await amsUserDao.save({
    email: email,
    password: hashedPassword,
    umsUser: {
      create: {
        username: generateFromEmail(email)
      }
    }
  })

  redirect('/login')
}
