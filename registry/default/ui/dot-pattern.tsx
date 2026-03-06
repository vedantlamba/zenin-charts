"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  size?: number      // space between dots
  radius?: number    // dot size
  className?: string
}

export function DotPattern({
  size = 16,
  radius = 1,
  className,
  ...props
}: DotPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-2 h-full w-full",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="currentColor"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  )
}
