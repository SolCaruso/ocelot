import Steam from "@/components/logos/partners-mobile/Steam";
import Solana from "@/components/logos/partners-mobile/Solana";
import Link from "next/link";
import Back from "@/components/ui/icons/Back";

import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { AnimatePresence, motion } from "framer-motion";

interface NavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavDrawer({ open, onOpenChange }: NavDrawerProps) {
  const [menu, setMenu] = React.useState<"main" | "guild">("main");

  // Custom handler to manage menu reset timing
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (isOpen) {
      // Reset menu immediately when opening
      setMenu("main");
    } else {
      // Delay reset until drawer close animation completes
      setTimeout(() => setMenu("main"), 250);
    }
  };

  // Accept HTMLButtonElement for button, but also HTMLAnchorElement for legacy support
  const handleSocialsClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const target = document.getElementById("socials");
    if (target) {
      // Initial smooth scroll
      target.scrollIntoView({ behavior: "smooth" });
    }
    // Close the drawer using handleOpenChange for consistent reset
    handleOpenChange(false);
    if (target) {
      // After drawer close and focus return, scroll again
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className="relative w-6 h-6">
          
        </button>
      </DrawerTrigger>
      <DrawerContent onCloseAutoFocus={(event: Event) => event.preventDefault()}>
        <div className="mx-auto w-full max-w-sm">

          <div className="pr-4 pl-10 pb-12 pt-8 min-h-[230px]">
            <nav>
              <AnimatePresence initial={false} mode="wait">
                {menu === "main" && (
                  <motion.ul
                    key="main"
                    className="space-y-4"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                  >
                    <li>
                      <div onClick={() => setMenu("guild")}>
                        <DrawerTitle>Guild Saga</DrawerTitle>
                      </div>
                    </li>
                    <li>
                      <Link href="/blog" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>Blog</DrawerTitle>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://docs.guildsaga.com/" target="_blank" rel="noopener noreferrer" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>Docs</DrawerTitle>
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={handleSocialsClick}>
                        <DrawerTitle>Socials</DrawerTitle>
                      </button>
                    </li>
                  </motion.ul>
                )}
                {menu === "guild" && (
                  <motion.ul
                    key="guild"
                    className="space-y-4"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                  >
                    <li>
                      <Back onClick={() => setMenu("main")} className='absolute top-10 left-12' />
                    </li>
                    <li className="flex items-start space-x-2">
                      <Link href="/" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>Vanished Worlds</DrawerTitle>
                      </Link>
                      <Steam className="h-5 w-auto mt-0.5 flex-shrink-0" />
                    </li>
                    <li className="flex items-start space-x-2">
                      <Link href="/" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>Labyrinths (coming soon)</DrawerTitle>
                      </Link>
                      <Solana className="h-5 w-auto mt-0.5 flex-shrink-0" />
                    </li>
                    <li className="flex items-start space-x-2">
                      <Link href="/primitives/typography" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>World Mode</DrawerTitle>
                      </Link>
                      <Solana className="h-5 w-auto mt-0.5 flex-shrink-0" />
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </nav>
          </div>
          <DrawerFooter>
            
            <DrawerClose asChild>
             
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
