import Steam from "@/components/logos/partners-mobile/Steam";
import Solana from "@/components/logos/partners-mobile/Solana";
import Link from "next/link";

import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface NavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavDrawer({ open, onOpenChange }: NavDrawerProps) {
  // Custom handler to manage menu reset timing
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  // Accept HTMLButtonElement for button, but also HTMLAnchorElement for legacy support
  const handleSocialsClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const target = document.getElementById("socials");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    handleOpenChange(false);
    setTimeout(() => {
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className="relative w-6 h-6">
          
        </button>
      </DrawerTrigger>
      <DrawerContent onCloseAutoFocus={(event: Event) => event.preventDefault()}>
        <div className="mx-auto w-full max-w-sm">

          <div className="px-0 pb-12 pt-4 min-h-[230px] relative">
            <nav>
              <ul className="space-y-6 pt-8">
                <li>
                  <Link href="/" onClick={() => onOpenChange(false)} className="flex items-center space-x-1">
                    <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Vanished Worlds</DrawerTitle>
                    <Steam className="h-5 w-auto flex-shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link href="/lab" onClick={() => onOpenChange(false)} className="flex items-center space-x-1">
                    <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Labyrinths</DrawerTitle>
                    <Solana className="h-5 w-auto flex-shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link href="/updates" onClick={() => onOpenChange(false)}>
                    <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Updates</DrawerTitle>
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleSocialsClick}>
                    <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Socials</DrawerTitle>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <div></div>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
