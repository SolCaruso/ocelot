import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 68 67"
    width='100%'
    height='100%'
    {...props}
  >
    <path fill="#fff" d="M26.2 19.363v28.583l22.46-14.291L26.2 19.362Z" className='opacity-50' />
    <circle cx={33.929} cy={33.369} r={23.561} stroke="#fff" className='opacity-40'/>
    <circle cx={33.929} cy={33.369} r={32.145} stroke="#fff" className='opacity-40' strokeWidth={2} />
  </svg>
)
export default SvgComponent
