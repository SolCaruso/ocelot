import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#221D17]/50 animate-pulse rounded-md filter blur-2xs", className)}
      {...props}
    />
  )
}

export { Skeleton }
