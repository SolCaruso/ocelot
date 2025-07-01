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

          <div className="pr-4 pl-10 pb-12 pt-8 min-h-[230px] relative">
            <nav>
              <AnimatePresence initial={false} mode="wait">
                {menu === "main" && (
                  <motion.ul
                    key="main"
                    className="space-y-4 pt-6"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                  >
                    <li>
                      <div onClick={() => setMenu("guild")}>
                        <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Guild Saga</DrawerTitle>
                      </div>
                    </li>
                    <li>
                      <Link href="/updates" onClick={() => onOpenChange(false)}>
                        <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Updates</DrawerTitle>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="https://docs.guildsaga.com/" target="_blank" rel="noopener noreferrer" onClick={() => onOpenChange(false)}>
                        <DrawerTitle>Docs</DrawerTitle>
                      </Link>
                    </li> */}
                    <li>
                      <button type="button" onClick={handleSocialsClick}>
                        <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Socials</DrawerTitle>
                      </button>
                    </li>
                  </motion.ul>
                )}
                {menu === "guild" && (
                  <>
                    <Back onClick={() => setMenu("main")} className='absolute top-2 left-0 text-[#FEE8D1] z-10 cursor-pointer' />
                    <motion.ul
                      key="guild"
                      className="space-y-4 pt-4"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
                    >
                      <li className="flex items-start space-x-2">
                        <Link href="/vw" onClick={() => onOpenChange(false)}>
                          <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Vanished Worlds</DrawerTitle>
                        </Link>
                        <Steam className="h-5 w-auto mt-0.5 flex-shrink-0" />
                      </li>
                      <li className="flex items-start space-x-2">
                        <Link href="/lab" onClick={() => onOpenChange(false)}>
                          <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">Labyrinths (coming soon)</DrawerTitle>
                        </Link>
                        <Solana className="h-5 w-auto mt-0.5 flex-shrink-0" />
                      </li>
                      <li className="flex items-start space-x-2">
                        <Link href="/primitives/typography" onClick={() => onOpenChange(false)}>
                          <DrawerTitle className="text-[#FEE8D1] hover:text-white transition-colors">World Mode</DrawerTitle>
                        </Link>
                        <Solana className="h-5 w-auto mt-0.5 flex-shrink-0" />
                      </li>
                    </motion.ul>
                  </>
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
