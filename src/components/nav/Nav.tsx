import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full absolute top-4 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/webp/ocelot-home.webp"
                alt="Ocelot Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>
          {/* Links in the center */}
          <div className="hidden md:flex space-x-12">
            <Link href="/guild-saga" className="text-[0.75rem] 4xl:text-[0.875rem] uppercase tracking-[3px] font-semibold text-white/80 hover:text-white">
              GUILD SAGA
            </Link>
            <Link href="/early-access" className="text-[0.75rem] 4xl:text-[0.875rem] uppercase tracking-[3px] font-semibold text-white/80 hover:text-white">
              EARLY ACCESS
            </Link>
            <Link href="/contact" className="text-[0.75rem] 4xl:text-[0.875rem] uppercase tracking-[3px] font-semibold text-white/80 hover:text-white">
              CONTACT
            </Link>
            <Link href="/blog" className="text-[0.75rem] 4xl:text-[0.875rem] uppercase tracking-[3px] font-semibold text-white/80 hover:text-white">
              BLOG
            </Link>
          </div>
          {/* Button on the right */}
          <div>
            <Link
              href="/buy"
              className="hidden lg:inline-flex items-center justify-center py-[10.5px] px-2.5 md:px-5 text-[0.75rem] leading-[1rem] font-bold tracking-[0.2px] cursor-pointer border-none rounded-[5px] transition-colors duration-200 ease-in-out bg-[#E6E6E6] hover:bg-[#FFF] shadow-md opacity-90 hover:opacity-100 text-black uppercase"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}