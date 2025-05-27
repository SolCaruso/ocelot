import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider.webp"
        alt="Divider"
        width={1780}
        height={65}
        className="z-30 absolute -bottom-10 left-1/2 -translate-x-1/2 select-none w-[1780px] max-w-none h-auto"
        draggable={false}
        sizes="1780px"
        style={{
          maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent 100%)'
        }}
      />
    )
}