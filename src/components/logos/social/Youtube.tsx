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
    aria-labelledby="icon-title-youtube"
    viewBox="0 0 48 48"
    {...props}
  >
    <title>{"YouTube"}</title>
    <path
      stroke="none"
      d="M19.909 29.91V18.09L30.364 24zm23.255-15.538a5.01 5.01 0 0 0-3.536-3.536C36.508 10 24 10 24 10s-12.508 0-15.628.836a5.01 5.01 0 0 0-3.536 3.536C4 17.492 4 24 4 24s0 6.508.836 9.628a5.01 5.01 0 0 0 3.536 3.536C11.492 38 24 38 24 38s12.508 0 15.628-.836a5.01 5.01 0 0 0 3.536-3.536C44 30.508 44 24 44 24s0-6.508-.836-9.628"
    />
  </svg>
)
export default SvgComponent
