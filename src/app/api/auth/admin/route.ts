import {findByEmail} from "@/action/dao/ams/admin.dao";
import {NextRequest, NextResponse} from "next/server";
import {saltAndHashPassword} from "@/libs/utils";
import {adminSignup} from "@/action/auth.action";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if(!email) {
    return NextResponse.error();
  }

  const admin = await findByEmail(email);

  if(!admin) {
    return NextResponse.error();
  }

  return NextResponse.json(admin);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await adminSignup(body);
    return NextResponse.json({ message: "Admin signed up successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign up admin" }, { status: 500 });
  }
}
