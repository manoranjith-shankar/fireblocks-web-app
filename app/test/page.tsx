"use client"

import React from "react";
import { UserAuth } from "@/app/context/AuthContext"
import { Button } from "@nextui-org/button";

export default function Page() {
  const {user, googleSignIn, logOut} = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        test background
      </p>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}