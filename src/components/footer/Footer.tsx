
import React from 'react';
import Divider from '@/components/ui/divider-footer';
import { Language } from '@/components/footer/Language';
import Ocelot from '@/components/logos/OcelotFooter';
import X from '@/components/logos/social/X';
import Youtube from '@/components/logos/social/Youtube';
import Discord from '@/components/logos/social/Discord';
import Steam from '@/components/logos/social/Steam';
import Image from 'next/image';
import Link from 'next/link';

const Trailer: React.FC = () => {
  
  return (
    <section className="relative overflow-x-clip">

      {/* Left fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gs-bg to-transparent z-20" />

      {/* Right fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gs-bg to-transparent z-20" />

      <div className="absolute inset-0"

        style={{

          // leather texture with subtle radial vignette
          backgroundImage: [
            'radial-gradient(farthest-corner at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 80%)',
            'url("/webp/leather-texture.webp")'
          ].join(', '),
          backgroundRepeat: 'repeat',
          boxShadow:
            'inset 0px 1px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.06), inset 0px -1px 0px rgba(0,0,0,0.24), inset 0px -2px 0px rgba(255,255,255,0.06)',
        }}

      />

        {/* Footer*/}
        <footer className="relative py-14 lg:py-22 z-30 px-12">
            <div className='max-w-7xl mx-auto' id='socials'>
                {/* Socials */}
                <div className="w-full pb-6 lg:pb-22 pt-18">
                <h3
                    className="bg-clip-text text-transparent text-4xl lg:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 text-center"
                    style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
                >
                    JOIN THE GUILD
                </h3>
                <ul className="flex gap-4 justify-center mt-3 lg:mt-6">
                    <li>
                    <a
                        href="https://x.com/GuildSaga"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <X className="w-12 lg:w-14 h-auto opacity-60 hover:opacity-100 transition-all duration-200 ease-[var(--ease-in-out-quad)]" />
                    </a>
                    </li>
                    <li>
                    <a
                        href="https://discord.gg/GuildSaga"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Discord className="w-10 lg:w-13 h-auto m-2 opacity-60 hover:opacity-100 transition-all duration-200 ease-[var(--ease-in-out-quad)]" />
                    </a>
                    </li>
                    <li>
                    <a
                        href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Steam className="w-9 lg:w-11 h-auto m-1.5 opacity-60 hover:opacity-100 transition-all duration-200 ease-[var(--ease-in-out-quad)]" />
                    </a>
                    </li>
                    <li>
                    <a
                        href="https://www.youtube.com/@GuildSaga"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Youtube className="w-12 lg:w-14 h-auto opacity-60 hover:opacity-100 transition-all duration-200 ease-[var(--ease-in-out-quad)]" />
                    </a>
                    </li>
                </ul>
                </div>

                {/* Links */}
                <div className='flex flex-col-reverse gap-4 lg:flex-row justify-between mt-12 lg:py-6 items-center mb-2'>
                    <ul className='w-full flex flex-wrap justify-center gap-x-1 gap-y-5 lg:gap-4 rounded-md uppercase font-semibold transition-all duration-200 ease-[var(--ease-in-out-quad)] lg:w-auto lg:justify-start'>
                        <li><Link href='/' rel="noopener noreferrer" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Vanished Worlds</Link></li>
                        <li><a href="https://world.guildsaga.com/" target="_blank" rel="noopener noreferrer" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">World Mode</a></li>
                        <li><Link href='/' className="text-stone-50  hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Blog</Link></li>
                        <li><a href="https://docs.guildsaga.com/" target="_blank" rel="noopener noreferrer" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 ">Docs</a></li>
                        <li><a href="https://db.guildsaga.com/items" target="_blank" rel="noopener noreferrer" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Database</a></li>
                        <li><Link href="/" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Contact</Link></li>
                    </ul>
                    <div className='mb-12 lg:mb-0 '>
                        <Language/>
                    </div>
                </div>

                {/* Divider */}
                <div className='border-b w-full px-4 hidden lg:block'></div>

                {/* Copyright */}
                <div className='flex flex-col lg:flex-row lg:justify-between justify-center items-center'>
                    <div className="flex flex-col items-center lg:gap-6 md:mt-6 lg:mt-0 lg:flex-row py-6 lg:py-12 align-middle">
                        <Link href='/'>
                            <Ocelot className="h-40 w-auto opacity-80 cursor-pointer"/>
                        </Link>
                        <div>
                            <div className='mb-3 pl-2'>
                                <p className="text-stone-400 text-center mt-10 lg:text-left text-sm font-semibold mb-1">
                                © {new Date().getFullYear()} Ocelot Technologies
                                </p>
                                <p className='text-stone-400 text-sm font-semibold text-center lg:text-left lg:max-w-none max-w-lg'>All <a href="" className='underline rounded-sm text-stone-300 hover:text-white focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]'>trademarks</a> referenced herein are the properties of their respective owners.</p>
                            </div>
                            <div className='flex justify-center lg:justify-normal gap-1 mt-6 lg:mt-4 lg:text-sm text-xs font-semibold transition-all duration-200 ease-[var(--ease-in-out-quad)]'>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 ">Privacy</a>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Terms</a>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Cookie Policy</a>
                                <a href="" className="text-stone-200 hidden lg:block hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1">Cookie Settings</a>
                            </div>
                        </div>
                    </div>
                    {/* Rating */}
                    <div className='flex gap-2 mt-5 w-24 md:w-auto'>
                        <Image src={'/webp/esrb.webp'} alt={'ESRB'} width={65} height={97} ></Image>
                        <Image src={'/webp/mature.webp'} alt={'Mature'} width={65} height={97} ></Image>
                    </div>
                </div>
            </div>
        </footer>
      <Divider />
    </section>
  );
};

export default Trailer;

