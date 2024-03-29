"use client"

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import { useAppStore } from "@/app/AppStore";

export default function AuthButton() {

  const { loggedUser, logout, login } = useAppStore();

  const handleSignIn = async () => {
    try {
      await login()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => { 
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {!loggedUser ? (
        <Button onClick={handleSignIn}>Sign In</Button>
      ) : (
      <Dropdown placement="bottom-start" backdrop="blur">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${loggedUser.photoURL}`,
            }}
            className="transition-transform"
            description={loggedUser.email}
            name={loggedUser.displayName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{loggedUser.displayName}</p>
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