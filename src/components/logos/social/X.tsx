import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0}
    aria-labelledby="icon-title-mathematical-double-struck-capital-x"
    viewBox="0 0 48 48"
    {...props}
  >
    <title>{"\uD835\uDD4F"}</title>
    <path
      stroke="none"
      d="M27.032 21.551 38.936 8h-2.82l-10.34 11.764L17.521 8H8l12.484 17.791L8 40h2.82l10.914-12.426L30.452 40h9.521M11.838 10.083h4.332L36.114 38.02h-4.333"
    />
  </svg>
)
export default SvgComponent
