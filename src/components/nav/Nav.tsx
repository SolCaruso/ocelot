"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavDrawer } from "@/components/nav/Mobile"
import Link from "next/link"
import Ocelot from "@/components/logos/Ocelot";
import OcelotLogo from "@/components/logos/OcelotLogo";
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
import SvgComponent from "@/components/ui/corner"

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
    <div className="flex items-center justify-end px-4 py-2 max-w-9xl mx-auto absolute top-2 left-0 right-0 z-30">
      {/* Left: Logo */}
      <Link
  href="/"
  className="absolute top-0 left-4 z-50 w-[90px] h-[112.5px] xl:w-[120px] xl:h-[150px] opacity-80 hover:opacity-100 transition-opacity duration-200 ease-[var(--ease-in-out-quad)]"
>
  <div className="md:hidden">
    <OcelotLogo className="w-34 mt-2 h-full text-[#FEE8D1]" />
  </div>
  <div className="hidden md:block">
    <Ocelot />
  </div>
</Link>

      {/* Center: Navigation */}
      <NavigationMenu className='hidden md:block absolute top-3 left-1/2 transform -translate-x-1/2'>
        <NavigationMenuList className="flex justify-center space-x-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger>GUILD SAGA</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3 hidden lg:block">
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
                  href="/vw"
                  title={
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
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
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
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
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
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

          <NavigationMenuItem>
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
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#socials" className={navigationMenuTriggerStyle()}>
                SOCIALS
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Right: Button */}
      <div className="justify-start mt-1 hidden md:flex">
        <Link
          href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer relative overflow-hidden xl:px-9 xl:py-3.5 py-3 px-8 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-100 translate-y-0 backdrop-blur-sm bg-black/20"
          style={{
            borderStyle: "solid",
            borderWidth: "0 1px 1px 1px",
            borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
          }}
        >
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 z-10 scale-x-[-1] opacity-50">
            <SvgComponent className="xl:w-14 xl:h-14 w-10 h-10" />
          </div>
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 z-10 opacity-50">
            <SvgComponent className="xl:w-14 xl:h-14 w-10 h-10" />
          </div>
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1] opacity-50">
            <SvgComponent className="xl:w-14 xl:h-14 w-10 h-10" />
          </div>
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] opacity-50">
            <SvgComponent className="xl:w-14 xl:h-14 w-10 h-10" />
          </div>
          
          <div className="relative">
            <p className="uppercase font-quattrocento text-base tracking-wide font-semibold text-[#fbcea0] group-hover:text-white text-center">
              BUY NOW
            </p>

          </div>
        </Link>
      </div>

      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 absolute top-1 right-2"
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute block h-[2px] bg-[#FEE8D1] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-0 w-full left-0"}`}></span>
            <span className={`absolute block h-[2px] bg-[#FEE8D1] transition-all duration-300 origin-center top-[8px] w-full left-0 ${isOpen ? "rotate-45" : ""}`}></span>
            <span className={`absolute block h-[2px] bg-[#FEE8D1] transition-all duration-300 origin-center top-[8px] w-full left-0 ${isOpen ? "-rotate-45" : ""}`}></span>
            <span className={`absolute block h-[2px] bg-[#FEE8D1] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-[16px] w-full left-0"}`}></span>
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

type ListItemProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'title' | 'href'> & {
  title: React.ReactNode;
  href: string;
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  ListItemProps
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          href={href}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug opacity-50 group-hover:opacity-80 text-white">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
