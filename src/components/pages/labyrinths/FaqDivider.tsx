import SvgComponent from "@/components/ui/divider-ends";

export default function FaqDivider({ className }: { className?: string }) {
  return (
    <div className={`mx-auto -mb-3 z-10 relative max-w-[1380px] ${className}`}>
        <div className="w-full flex items-center">
        {/* Left Cap */}
        <div className="w-9 h-8">
            <SvgComponent className="w-full h-full" />
        </div>
        
        {/* Two Divider Lines Very Close Together */}
        <div className="flex-1">
            <div className="h-[1px] bg-[#896D51] mb-[4.6px]"></div>
            <div className="h-[1px] bg-[#553C22]"></div>
        </div>
        
        {/* Right Cap */}
        <div className="w-9 h-8 scale-x-[-1]">
            <SvgComponent className="w-full h-full" />
        </div>
        </div>
    </div>
  )
}