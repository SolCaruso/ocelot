"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function CookiePolicyClient() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    
    if (scrollTo === 'manage-cookies') {
      // First scroll to top to ensure we start from the top
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      // Then smooth scroll down to the target section after a delay
      setTimeout(() => {
        const element = document.getElementById('manage-cookies')
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
          })
        }
      }, 300) // Longer delay to show the top of the page first
    }
  }, [searchParams])

  return null // This component doesn't render anything
}
