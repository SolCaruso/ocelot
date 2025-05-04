
import React from 'react';
import Divider from '@/components/ui/divider-footer';
import { Language } from '@/components/footer/Language';
import Ocelot from '@/components/logos/mobile/Ocelot';

const Trailer: React.FC = () => {
  
  return (
    <section className="relative overflow-x-clip">

      {/* Left fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gs-bg to-transparent z-20" />

      {/* Right fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gs-bg to-transparent z-20" />

      <div className="absolute inset-0 opacity-40"

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
        <footer className="relative py-22 z-30 px-12">
            <div className='max-w-7xl mx-auto'>
                {/* Socials */}
                <div className="w-full py-22">
                    <h3
                    className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 text-center"
                    style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
                    >
                    JOIN THE GUILD
                    </h3>
                    <ul className='flex gap-4 justify-center mt-6'>
                        <li><a href="" className="text-stone-50 hover:text-white">Discord</a></li>
                        <li><a href="" className="text-stone-50 hover:text-white">Twitter</a></li>
                        <li><a href="" className="text-stone-50 hover:text-white">Instagram</a></li>
                        <li><a href="" className="text-stone-50 hover:text-white">Youtube</a></li>
                    </ul>
                </div>

                {/* Links */}
                <div className='flex flex-col gap-4 mt-6 md:mt-0 md:flex-row justify-between py-12'>
                    <ul className=' rounded-md uppercase font-semibold flex gap-4'>
                        <li><a href="" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Guild Saga</a></li>
                        <li><a href="" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Blog</a></li>
                        <li><a href="" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Docs</a></li>
                        <li><a href="" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Database</a></li>
                        <li><a href="" className="text-stone-50 hover:bg-white/5 p-2.5 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Contact</a></li>
                    </ul>
                    <Language className=''/>
                </div>

                {/* Divider */}
                <div className='border-b w-full px-4'></div>

                {/* Copyright */}
                <div>
                    <div className="flex flex-col gap-4 mt-6 md:mt-0 md:flex-row py-12">
                        <Ocelot className=" h-32 w-auto opacity-80 cursor-pointer "/>
                        <div>
                            <div className='mb-3 pl-2'>
                                <p className="text-stone-400 text-center mt-10 md:text-left text-sm font-semibold mb-1">
                                    © 2023 Ocelot Technologies
                                </p>
                                <p className='text-stone-400 text-sm font-semibold text-center md:text-left'>All <a href="" className='underline rounded-sm text-stone-200 hover:text-white focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1'>trademarks</a> referenced herein are the properties of their respective owners.</p>
                            </div>
                            <div className='flex gap-1 mt-12 md:mt-4 text-sm font-semibold'>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Privacy</a>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Terms</a>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Cookie Policy</a>
                                <a href="" className="text-stone-200 hover:text-white hover:bg-white/5 p-2 rounded-sm focus:bg-white/5 focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px] focus-visible:outline-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">Cookie Settings</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      <Divider />
    </section>
  );
};

export default Trailer;

