"use client"

import { useState } from "react"
import { Search, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/Footer"
import HeroSection from "@/components/pages/home/HeroSection"

// Sample data
const sweets = [
  {
    id: 1,
    name: "Gulab Jamun",
    category: "Traditional",
    stock: 25,
    price: 120,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Rasgulla",
    category: "Bengali",
    stock: 30,
    price: 100,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Jalebi",
    category: "Traditional",
    stock: 15,
    price: 80,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Kaju Katli",
    category: "Dry Fruits",
    stock: 20,
    price: 300,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Rasmalai",
    category: "Bengali",
    stock: 18,
    price: 150,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Barfi",
    category: "Traditional",
    stock: 22,
    price: 200,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
]

const categories = ["All", "Traditional", "Bengali", "Dry Fruits"]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || sweet.category === selectedCategory
    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "0-100" && sweet.price <= 100) ||
      (priceRange === "101-200" && sweet.price > 100 && sweet.price <= 200) ||
      (priceRange === "201+" && sweet.price > 200)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }))
  }

  const handleBuy = (sweet: any) => {
    const quantity = quantities[sweet.id] || 1
    alert(`Ordered ${quantity} ${sweet.name}(s) for ₹${sweet.price * quantity}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <HeroSection />

      {/* Search and Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sweets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Prices</SelectItem>
                <SelectItem value="0-100">₹0 - ₹100</SelectItem>
                <SelectItem value="101-200">₹101 - ₹200</SelectItem>
                <SelectItem value="201+">₹201+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((sweet) => (
            <Card
              key={sweet.id}
              className="overflow-hidden hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                <img src={sweet.image || "/placeholder.svg"} alt={sweet.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{sweet.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary">{sweet.category}</Badge>
                  <span className="text-sm text-gray-600">{sweet.stock} left</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(sweet.id, -1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-3 py-1 min-w-[2rem] text-center">{quantities[sweet.id] || 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(sweet.id, 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleBuy(sweet)}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Buy ₹{sweet.price}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
