import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider-bottom.webp"
        alt="Divider Bottom"
        width={1215}
        height={63}
        className="z-30 absolute -bottom-12 left-1/2 -translate-x-1/2 select-none max-w-none scale-y-[-1] opacity-60"
        draggable={false}
      />
    )
}