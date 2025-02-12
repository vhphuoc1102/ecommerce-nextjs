"use client";
import {cn} from "@/libs/utils"
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useActionState, useEffect, useState} from "react";
import Link from "next/link";
import {useSearchParams} from 'next/navigation';
import {login} from "@/action/auth.action";

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentPropsWithoutRef<"form">) {
  const [isAdmin, setIsAdmin] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callBackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
      login,
      undefined,
  );
  useEffect(() => {
    setIsAdmin(window.location.host === process.env.NEXT_PUBLIC_ADMIN_HOST_NAME);
  }, []);
  return (
      <form action={formAction} className={cn("flex flex-col gap-4", className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-nowrap text-2xl font-bold">Login to your {isAdmin ? "admin" : ""} account</h1>
          <span className="text-balance text-sm text-muted-foreground">
            Enter your email and password to login
          </span>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required/>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" name="password" type="password" required/>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl}/>
          <input type="hidden" name="isAdmin" value={isAdmin.toString()}/>
          <Button type="submit" className="w-full" aria-disabled={isPending}>
            Login
          </Button>
          {errorMessage &&
              <div
                  className="flex h-4 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
              >
                  <>
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                      <p className="text-xs text-red-500">{errorMessage}</p>
                  </>

              </div>}
          {
              !isAdmin &&
              <>
                  <div
                      className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                  </span>
                  </div>
                  <Button variant="outline" className="w-full">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                           xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                          <path fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                      Login with Google
                  </Button>
              </>
          }
        </div>
        {
            !isAdmin &&
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        }
      </form>
  )
}
