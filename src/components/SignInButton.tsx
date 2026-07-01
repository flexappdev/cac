"use client";

import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-7 w-7 rounded-full bg-zinc-800/60 animate-pulse" aria-label="Loading session" />
    );
  }

  if (session?.user) {
    const label = session.user.name ?? session.user.email ?? "Signed in";
    return (
      <button
        type="button"
        onClick={() => signOut()}
        title={`Sign out — ${label}`}
        aria-label={`Sign out ${label}`}
        className="group flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded-full ring-1 ring-zinc-700"
            unoptimized
          />
        ) : (
          <span className="h-[22px] w-[22px] rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-200">
            {label.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="hidden sm:inline text-xs">{label.split(" ")[0]}</span>
        <LogOut className="hidden group-hover:inline-block h-3 w-3" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      title="Sign in with Google"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
    >
      <LogIn className="h-3 w-3" />
      <span className="hidden sm:inline">Sign in</span>
    </button>
  );
}
