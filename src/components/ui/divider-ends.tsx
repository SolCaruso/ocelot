import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1 copy"
    viewBox="0 0 30 6"
    {...props}
  >
    <path
      d="M0 3s.728-1.23 1.687-1.968C2.548.37 3.492 0 4.883 0H30v1H11.238s-.956-.08-1.595.543c-.619.601-.806 1.473-.806 1.473s-.288-1.655-1.512-1.962C6.22.777 5.228 1.397 4.63 2.114 4.258 2.56 4 3 4 3H0Z"
      style={{
        fill: "#896d51",
        fillRule: "evenodd",
        strokeWidth: 0,
      }}
    />
    <path
      d="M0 3s.728 1.23 1.687 1.968C2.548 5.63 3.492 6 4.883 6H30V5H11.238s-.956.08-1.595-.543c-.619-.601-.806-1.473-.806-1.473s-.288 1.655-1.512 1.962c-1.105.277-2.097-.343-2.696-1.06C4.258 3.44 4 3 4 3H0Z"
      style={{
        fillRule: "evenodd",
        strokeWidth: 0,
        fill: "#553c22",
      }}
    />
  </svg>
)
export default SvgComponent
