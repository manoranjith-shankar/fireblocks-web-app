"use client"

import React from "react";
import { UserAuth } from "@/app/context/AuthContext"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function AuthButton() {
  const {user, googleSignIn, logOut, loading} = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => { 
    try {
      await logOut();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      { loading ? null : !user ? (
        <Button onClick={handleSignIn}>Sign In</Button>
      ) : (
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${user.photoURL}`,
            }}
            className="transition-transform"
            description={user.email}
            name={user.displayName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user.displayName}</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      )}
    </div>
  );
}