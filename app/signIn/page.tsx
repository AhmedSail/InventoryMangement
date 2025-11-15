import { SignIn } from "@stackframe/stack";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
      <div className="flex flex-col content-center">
        <SignIn />
        <Link href="/dashboard" className="font-bold text-center mt-2">
          Or Back To Home
        </Link>
      </div>
    </div>
  );
};

export default page;
