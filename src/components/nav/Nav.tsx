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
import { useRecentPosts } from "@/hooks/useRecentPosts"

// Import new navigation assets
import vwNavAvif from '@/assets/avif/vw-nav.avif'
import vwNavWebp from '@/assets/webp/vw-nav.webp'
import labNavAvif from '@/assets/avif/lab-nav.avif'
import labNavWebp from '@/assets/webp/lab-nav.webp'

export default function Nav() {
  const defaultImage = '/gif/vw.gif';
  const [isOpen, setIsOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);
  const [loadedGifs, setLoadedGifs] = useState<Set<string>>(new Set());
  const imageOrder = [
    '/gif/vw.gif',
    '/gif/lab-hero.gif',
    '/gif/world.gif',
  ];
  const prevIndexRef = useRef(imageOrder.indexOf(defaultImage));
  const { posts: recentPosts } = useRecentPosts();
  const MAX_SUMMARY_LENGTH = 71;

  // Thumbnail mapping
  const thumbnailMap = {
    '/gif/vw.gif': '/avif/vw-nav-thumbnail.avif',
    '/gif/lab-hero.gif': '/avif/lab-nav-thumbnail.avif',
    '/gif/world.gif': '/avif/wm-nav-thumbnail.avif',
  };

  // Logo mapping
  const logoMap = {
    '/gif/vw.gif': { avif: vwNavAvif, webp: vwNavWebp },
    '/gif/lab-hero.gif': { avif: labNavAvif, webp: labNavWebp },
    '/gif/world.gif': { avif: vwNavAvif, webp: vwNavWebp }, // Using VW logo for world mode
  };

  const handlePreview = (img: string) => {
    const newIndex = imageOrder.indexOf(img);
    prevIndexRef.current = newIndex;
    setPreviewImage(img);
  };

  const resetPreview = () => {
    setPreviewImage(defaultImage);
  };

  const handleGifLoad = (gifSrc: string) => {
    setLoadedGifs(prev => new Set([...prev, gifSrc]));
  };

  const handleSocialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("socials");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-end px-4 py-2 max-w-7xl mx-auto absolute top-2 left-0 right-0 z-30">
      {/* Left: Logo */}
      <Link
  href="/"
  className="absolute top-0 left-4 z-50 w-[90px] h-[112.5px] 3xl:w-[108px] 3xl:h-[135px] opacity-80 hover:opacity-100 transition-opacity duration-200 ease-[var(--ease-in-out-quad)]"
>
  <div className="md:hidden">
    <OcelotLogo className="w-34 mt-2 h-full text-[#FEE8D1]" />
  </div>
  <div className="hidden md:block">
    <Ocelot />
  </div>
</Link>

      {/* Center: Navigation */}
      <NavigationMenu className='hidden md:block absolute top-3 left-1/2 transform -translate-x-1/2' onValueChange={(value) => {
        if (!value) {
          // Delay the reset until the menu is fully closed to prevent visual jumping
          setTimeout(() => {
            resetPreview();
          }, 150);
        }
      }}>
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
                                backgroundImage: `url(${loadedGifs.has(previewImage) ? previewImage : thumbnailMap[previewImage as keyof typeof thumbnailMap]})`,
                                backgroundSize: 'cover',
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
                          
                          {/* Preload GIFs */}
                          {imageOrder.map((gifSrc) => (
                            <img
                              key={gifSrc}
                              src={gifSrc}
                              alt=""
                              style={{ display: 'none' }}
                              onLoad={() => handleGifLoad(gifSrc)}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                      <AnimatePresence>
                        {previewImage === '/gif/vw.gif' && (
                          <motion.div
                            key="logo-vw"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ width: '150px', height: '150px' }}
                          >
                            <picture>
                              <source srcSet={logoMap['/gif/vw.gif'].avif.src} type="image/avif" />
                              <img
                                src={logoMap['/gif/vw.gif'].webp.src}
                                alt="VW logo overlay"
                                className="w-full h-full object-contain"
                              />
                            </picture>
                          </motion.div>
                        )}
                        {previewImage === '/gif/lab-hero.gif' && (
                          <motion.div
                            key="logo-lab"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ width: '150px', height: '150px' }}
                          >
                            <picture>
                              <source srcSet={logoMap['/gif/lab-hero.gif'].avif.src} type="image/avif" />
                              <img
                                src={logoMap['/gif/lab-hero.gif'].webp.src}
                                alt="Labyrinths logo overlay"
                                className="w-full h-full object-contain"
                              />
                            </picture>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/"
                  title={
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
                      <span>Vanished Worlds</span>
                      <Steam className="ml-1 h-4 w-auto" />
                    </div>
                  }
                  className={cn(previewImage === '/gif/vw.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/vw.gif')}
                >
                  <span className="line-clamp-2 text-sm leading-snug opacity-50 group-hover:opacity-80 text-white">
                    Fantasy tactics CRPG, early access available now on Steam.
                  </span>
                </ListItem>
                <ListItem
                  href="/lab"
                  title={
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
                      <span>Labyrinths</span>
                      <Solana className="ml-1 h-4 w-auto" />
                    </div>
                  }
                  className={cn(previewImage === '/gif/lab-hero.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/lab-hero.gif')}
                >
                  <span className="line-clamp-2 text-sm leading-snug opacity-50 group-hover:opacity-80 text-white">
                    Pvp gauntlet mode game built on Solana (coming soon).
                  </span>
                </ListItem>
                <ListItem
                  href="https://world.guildsaga.com/" target="_blank" rel="noopener noreferrer"
                  title={
                    <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
                      <span>World Mode</span>
                    </div>
                  }
                  className={cn(previewImage === '/gif/world.gif' && 'bg-accent/70')}
                  onMouseEnter={() => handlePreview('/gif/world.gif')}
                >
                  <span className="line-clamp-2 text-sm leading-snug opacity-50 group-hover:opacity-80 text-white">
                    Gamified staking web app built on Solana.
                  </span>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>UPDATES</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] items-stretch">
                {recentPosts.slice(0, 5).map((post) => {
                  const words = post.title.split(" ");
                  const shortTitle = words.length > 3 ? words.slice(0, 3).join(" ") + "..." : post.title;
                  const summary = post.summary && post.summary.length > MAX_SUMMARY_LENGTH ? `${post.summary.slice(0, MAX_SUMMARY_LENGTH)}...` : post.summary;
                  return (
                    <li key={post.id} className="h-full">
                      <NavigationMenuLink asChild>
                        <Link href={`/updates/${post.date}`} className="group flex flex-col justify-between h-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground min-h-[64px]">
                          <div className="flex items-center font-semibold opacity-80 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity">
                            {shortTitle}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug opacity-50 group-hover:opacity-80 text-white">
                            {summary}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  );
                })}
                <li className="h-full flex items-center justify-center">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/updates"
                      className="group cursor-pointer relative  w-full flex items-center justify-center px-8 py-4 transition-all duration-200 ease-[var(--ease-in-out-quad)]  opacity-100 translate-y-0 border border-[#534C3F]/40"
                      
                    >
                      <div className="relative">
                        <p className="uppercase font-quattrocento text-sm tracking-wide font-semibold text-[#8F8B8A] group-hover:text-white text-center">
                          See All
                        </p>
                        <span className="absolute left-full ml-2 top-0 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-[var(--ease-in-out-quad)] text-[#8F8B8A] group-hover:text-white">
                          →
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#socials" className={navigationMenuTriggerStyle()} onClick={handleSocialsClick}>
                SOCIALS
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="justify-start mt-1 3xl:mt-1.5 hidden md:flex">
        <Link
          href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer relative overflow-hidden 3xl:px-8 3xl:py-3 py-3 px-8 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-100 translate-y-0 backdrop-blur-sm bg-black/20"
          style={{
            borderStyle: "solid",
            borderWidth: "0 1px 1px 1px",
            borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
          }}
        >
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 z-10 scale-x-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
            <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
          </div>
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
            <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
          </div>
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] opacity-30 scale-y-[-1] group-hover:opacity-600 transition-opacity duration-300 ease-[var(--ease-in-out-quad)]">
            <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
          </div>
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] group-hover:opacity-30 transition-opacity duration-600 ease-[var(--ease-in-out-quad)]">
            <SvgComponent className="w-18 h-18 group-hover:w-18 group-hover:h-18" />
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
          className="p-4 absolute top-1 right-1 scale-110"
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-6 ">
            <span className={`rounded-full absolute block h-[2.5px] bg-[#FEE8D1] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-0 w-full left-0"}`}></span>
            <span className={`rounded-full absolute block h-[2.5px] bg-[#FEE8D1] transition-all-300 origin-center top-[8px] w-full right-0 ${isOpen ? "rotate-45" : ""}`}></span>
            <span className={`rounded-full absolute block h-[2.5px] bg-[#FEE8D1] transition-all duration-300 origin-center top-[8px] w-full right-0 ${isOpen ? "-rotate-45" : ""}`}></span>
            <span className={`rounded-full absolute block h-[2.5px] bg-[#FEE8D1] transition-all duration-300 ${isOpen ? "top-[8px] w-0 left-[50%]" : "top-[16px] w-1/2 right-0"}`}></span>
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
          {title}
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
