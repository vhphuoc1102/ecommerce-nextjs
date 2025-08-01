import {GalleryVerticalEnd} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {SignupForm} from "@/components/signup-form";

export default function SignupPage() {
  return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col justify-between p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              E-Market
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
              width={7360} height={4912}
              src="/signup-background.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
  )
}
