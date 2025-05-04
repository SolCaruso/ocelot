import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider-footer.webp"
        alt="Divider"
        width={1780}
        height={65}
        className="z-30 absolute -top-8 left-1/2 -translate-x-1/2 select-none max-w-none"
        draggable={false}
        style={{
            maskImage: 'linear-gradient(to right, black 10%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent 100%)'
          }}
      />
    )
}