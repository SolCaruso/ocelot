"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavDrawer } from "@/components/nav/Mobile"
import Link from "next/link"
import Ocelot from "@/components/logos/OcelotHome";
import Steam from "@/components/logos/partners-mobile/Steam";
import Solana from "@/components/logos/partners-mobile/Solana";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function Nav() {
  const defaultImage = '/gif/vw.gif';
  const [isOpen, setIsOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);
  const imageOrder = [
    '/gif/vw.gif',
    '/gif/lab.gif',
    '/gif/world.gif',
  ];
  const prevIndexRef = useRef(imageOrder.indexOf(defaultImage));

  const handlePreview = (img: string) => {
    const newIndex = imageOrder.indexOf(img);
    prevIndexRef.current = newIndex;
    setPreviewImage(img);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-9xl mx-auto absolute top-3 left-0 right-0 z-30">
      {/* Left: Logo */}
      <div>
        <Link href="/" className="inline-block mt-1 ml-2 md:ml-0">
          <Ocelot className="h-8 w-auto opacity-80 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]" />
        </Link>
      </div>

      {/* Center: Navigation */}
      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList className="flex justify-center space-x-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger>GUILD SAGA</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      {previewImage ? (
                        // AnimatePresence and motion.div for preview background
                        <>
                          <AnimatePresence>
                            <motion.div
                              key={previewImage}
                              className="absolute inset-0 h-full w-full rounded-md"
                              style={{
                                backgroundImage: `url(${previewImage})`,
                                // Increase height slightly for the Labyrinth GIF to hide its white top edge
                                backgroundSize: previewImage === '/gif/lab.gif' ? 'auto 110%' : 'cover',
                                backgroundPosition: 'center',
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
                            />
                          </AnimatePresence>
                          {/* Shader overlay sits above GIF, below logos */}
                          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                        </>
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                      <AnimatePresence>
                        {previewImage === '/gif/vw.gif' && (
                          <motion.img
                            key="logo-vw"
                            src="/webp/vw.webp"
                            alt="VW logo overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none h-42 w-auto"
                          />
                        )}
                        {previewImage === '/gif/lab.gif' && (
                          <motion.img
                            key="logo-lab"
                            src="/webp/labyrinths.webp"
                            alt="Labyrinths logo overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none h-42 w-auto"
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/"
                  title={
                    <div className="flex items-center">
                      <span>Vanished Worlds</span>
                      <Steam className="ml-1 h-4 w-auto" />
                    </div>
                  }
                  className={cn(previewImage === '/gif/vw.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/vw.gif')}
                >
                  Fantasy tactics CRPG, early access available now on Steam.
                </ListItem>
                <ListItem
                  href="/"
                  title={
                    <div className="flex items-center">
                      <span>Labyrinths</span>
                      <Solana className="ml-1 h-4 w-auto" />
                    </div>
                  }
                  className={cn(previewImage === '/gif/lab.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/lab.gif')}
                >
                  Pvp gauntlet mode game built on Solana (coming soon).
                </ListItem>
                <ListItem
                  href="https://world.guildsaga.com/" target="_blank" rel="noopener noreferrer"
                  title={
                    <div className="flex items-center">
                      <span>World Mode</span>
                      <Solana className="ml-1 h-4 w-auto" />
                    </div>
                  }
                  className={cn(previewImage === '/gif/world.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/world.gif')}
                >
                  Gamified staking web app built on Solana.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>UPDATES</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a
                href="https://docs.guildsaga.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={navigationMenuTriggerStyle()}
              >
                DOCS
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#socials" className={navigationMenuTriggerStyle()}>
                SOCIALS
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          {/* test */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/blog" className={navigationMenuTriggerStyle()}>
                UPDATES
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* test */}

        </NavigationMenuList>
      </NavigationMenu>

      {/* Right: Button */}
      <div>
        <a
          href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
          target="_blank"
          rel="noopener noreferrer"
          className=" items-center justify-center py-3 px-4 text-[0.75rem] leading-[1rem] font-bold tracking-[0.2px] cursor-pointer border-none rounded-[5px] transition-colors duration-200 ease-in-out bg-[#E6E6E6] hover:bg-[#FFF] shadow-md opacity-90 hover:opacity-100 text-black uppercase md:block hidden"
        >
          BUY NOW
        </a>
      </div>

      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 absolute top-1 right-2"
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute block h-[2px] bg-white transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-0 w-full left-0"}`}></span>
            <span className={`absolute block h-[2px] bg-white transition-all duration-300 origin-center top-[8px] w-full left-0 ${isOpen ? "rotate-45" : ""}`}></span>
            <span className={`absolute block h-[2px] bg-white transition-all duration-300 origin-center top-[8px] w-full left-0 ${isOpen ? "-rotate-45" : ""}`}></span>
            <span className={`absolute block h-[2px] bg-white transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-[16px] w-full left-0"}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <NavDrawer
          open={isOpen}
          onOpenChange={(open: boolean) => setIsOpen(open)}
        />
      </div>
    </div>
  )
}

type ListItemProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'title'> & {
  title: React.ReactNode;
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  ListItemProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
