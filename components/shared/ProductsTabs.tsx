"use client"

import { cn } from "@/lib/utils"

const tabs = ["All Plants", "New Arrivals", "Sale"]

interface Props {
  value: string
  onChange: (value: string) => void
}

export function ProductsTabs({ value, onChange }: Props) {
  return (
    <div className="bg-transparent">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "rounded-none px-2 transition-all mr-9 hover:text-primary",
            value === tab
              ? "text-primary border-b-2 pb-0.5 border-primary"
              : ""
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
