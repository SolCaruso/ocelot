import Image from 'next/image';

export default function Divider() {
    return (
      <Image
        src="/webp/divider-footer.webp"
        alt="Divider"
        width={1780}
        height={65}
        className="z-30 absolute -top-8 left-1/2 -translate-x-1/2 select-none w-[1780px] max-w-none h-auto"
        draggable={false}
        sizes="1780px"
      />
    )
}