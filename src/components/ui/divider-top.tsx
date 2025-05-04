import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider-top.webp"
        alt="Divider Top"
        width={1215}
        height={63}
        className="z-30 absolute -top-8 left-1/2 -translate-x-1/2 select-none max-w-none opacity-60"
        draggable={false}
      />
    )
}