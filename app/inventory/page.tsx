"use client"

import { useState } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import Footer from "@/components/Footer"
import Header from "@/components/pages/inventory-management/Header"

// Sample data
const initialSweets = [
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
  {
    id: 7,
    name: "Sandesh",
    category: "Bengali",
    stock: 12,
    price: 180,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Peda",
    category: "Traditional",
    stock: 35,
    price: 90,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Badam Halwa",
    category: "Dry Fruits",
    stock: 8,
    price: 350,
    image: "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200",
  },
]

const categories = ["All", "Traditional", "Bengali", "Dry Fruits"]

export default function InventoryPage() {
  const [sweets, setSweets] = useState(initialSweets)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [stockToAdd, setStockToAdd] = useState("")
  const [selectedSweetId, setSelectedSweetId] = useState<number | null>(null)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)

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

  const handleAddStock = () => {
    if (selectedSweetId && stockToAdd) {
      setSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === selectedSweetId ? { ...sweet, stock: sweet.stock + Number.parseInt(stockToAdd) } : sweet,
        ),
      )
      setStockToAdd("")
      setSelectedSweetId(null)
      setIsAddStockOpen(false)
    }
  }

  const handleDeleteSweet = (id: number) => {
    setSweets((prev) => prev.filter((sweet) => sweet.id !== id))
  }

  const openAddStockDialog = (id: number) => {
    setSelectedSweetId(id)
    setIsAddStockOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Header />

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Sweet
            </Button>
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
                <SelectValue placeholder="Filter by Price Range" />
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

        {/* Sweets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((sweet) => (
            <Card
              key={sweet.id}
              className="overflow-hidden hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <img src={sweet.image || "/placeholder.svg"} alt={sweet.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{sweet.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge variant="secondary">{sweet.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className={`font-semibold ${sweet.stock < 10 ? "text-red-600" : "text-green-600"}`}>
                      {sweet.stock} left
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold text-blue-600">₹{sweet.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog
                    open={isAddStockOpen && selectedSweetId === sweet.id}
                    onOpenChange={(open) => {
                      setIsAddStockOpen(open)
                      if (!open) {
                        setSelectedSweetId(null)
                        setStockToAdd("")
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => openAddStockDialog(sweet.id)}
                      >
                        Add Stock
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Stock for {sweet.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="stock">Quantity to Add</Label>
                          <Input
                            id="stock"
                            type="number"
                            placeholder="Enter quantity"
                            value={stockToAdd}
                            onChange={(e) => setStockToAdd(e.target.value)}
                            min="1"
                          />
                        </div>
                        <Button onClick={handleAddStock} className="w-full">
                          Add Stock
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {sweet.name} from your inventory. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteSweet(sweet.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
