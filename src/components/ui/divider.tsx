import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider.webp"
        alt="Divider"
        width={1780}
        height={65}
        className="z-30 absolute -bottom-12 left-1/2 -translate-x-1/2 select-none max-w-none opacity-60"
        draggable={false}
        style={{
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent 100%)'
        }}
      />
    )
}