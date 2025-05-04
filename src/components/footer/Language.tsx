'use client'

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type LanguageProps = React.ComponentPropsWithoutRef<typeof SelectTrigger>

export function Language({ className, ...props }: LanguageProps) {
  const [value, setValue] = useState("english")

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={cn("w-[180px]", className)} {...props}>
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="apple">Français</SelectItem>
          <SelectItem value="pineapple">Español</SelectItem>
          <SelectItem value="banana">日本語</SelectItem>
          <SelectItem value="blueberry">한국어</SelectItem>
          <SelectItem value="grapes">繁體中文</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
