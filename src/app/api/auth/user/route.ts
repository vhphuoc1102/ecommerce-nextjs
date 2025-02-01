import {findByEmail} from "@/action/dao/ams/user.dao";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if(!email) {
    return NextResponse.error();
  }

  const user = await findByEmail(email);

  if(!user) {
    return NextResponse.error();
  }

  return NextResponse.json(user);
}
