"use server"
import {FormState} from "@/libs/zod";
import {SignUpSchema} from "@/libs/zod";
import * as amsUserDao from "@/action/dao/ams/user.dao"
import * as umsAdminDao from "@/action/dao/ums/admin.dao"
import {redirect} from "next/navigation";
import {generateFromEmail} from "unique-username-generator";
import {saltAndHashPassword} from "@/libs/utils";
import {userAuth, adminAuth} from "@/libs/auth";
import {AuthError} from "next-auth";
import {Prisma} from "@prisma/client";

export const login
    = async (
        prevState: string | undefined,
        formData: FormData) => {
  console.log("=========isAdmin",formData.get('isAdmin'));
  try {
    if(formData.get('isAdmin') || formData.get('isAdmin') === 'true') {
      await adminAuth.signIn('credentials', formData);
    } else {
      await userAuth.signIn('credentials', formData);
    }
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

  if(formData.get('isAdmin') || formData.get('isAdmin') === 'true') {
    redirect('/dashboard')
  }
  redirect('/')
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

export async function signout() {
  try {
    await userAuth.signOut()
  } catch (error) {
    console.error(error)
  }

  redirect('/')
}

export async function adminSignup(data: any) {
  const hashedPassword = await saltAndHashPassword(data.password)

  const amsAdminToSave: Prisma.AmsAdminCreateWithoutUmsAdminInput = {
    email: data.email,
    password: hashedPassword,
  }

  const umsAdminToSave: Prisma.UmsAdminCreateInput = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    phone: data.phone,
    amsAdmin: {
      create: amsAdminToSave
    }
  }

  await umsAdminDao.save(umsAdminToSave)
}
