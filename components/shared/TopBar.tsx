"use client"

import { useState } from "react"
import { ProductsTabs } from "./ProductsTabs"
import { SortSelect } from "./Sort"

export function ProductsFilterBar() {
  const [activeTab, setActiveTab] = useState("All Plants")
  const [sort, setSort] = useState("default")

  return (
    <div className="flex justify-between items-center w-full mb-6">
      <ProductsTabs value={activeTab} onChange={setActiveTab} />
      <SortSelect value={sort} onChange={setSort} />
    </div>
  )
}