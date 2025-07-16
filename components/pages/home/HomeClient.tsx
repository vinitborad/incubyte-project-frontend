"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { Search, Minus, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

import Footer from "@/components/Footer" // Assuming you have this component
import HeroSection from "@/components/pages/home/HeroSection" // Assuming you have this component

import { fetchCategories, Sweet, searchSweets, purchaseSweet } from "@/lib/api"

interface HomeClientProps {
  initialSweets: Sweet[];
}

export function HomeClient({ initialSweets }: HomeClientProps) {
  const queryClient = useQueryClient();

  // --- Client-Side State for Filters and Quantities ---
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [sweetToBuy, setSweetToBuy] = useState<Sweet | null>(null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms delay

  const searchParams = useMemo(() => {
    const params: any = {};
    if (debouncedSearchTerm) params.name = debouncedSearchTerm;
    if (selectedCategory !== "All") params.category = selectedCategory;

    if (priceRange !== "All") {
      const [min, max] = priceRange.split('-');
      if (min) params.minPrice = parseInt(min, 10);
      // For the '201+' case, there is no max price.
      if (max) params.maxPrice = parseInt(max, 10);
    }
    return params;
  }, [debouncedSearchTerm, selectedCategory, priceRange]);

  // --- Data Fetching with TanStack Query ---
  const { data: sweets, isLoading, error } = useQuery<Sweet[]>({
    queryKey: ['sweets', searchParams],
    queryFn: () => searchSweets(searchParams),
    initialData: initialSweets,
  });

  const { data: fetchedCategories, isLoading: isLoadingCategories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // mutation for purchasing a sweet
  const { mutate: purchase, isPending: isPurchasing } = useMutation({
    mutationFn: purchaseSweet,
    onSuccess: () => {
      // On success, invalidate the 'sweets' query to refetch data
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      setSweetToBuy(null);
    },
    onError: (error) => {
      alert(`Purchase failed: ${error.message}`);
      setSweetToBuy(null);
    }
  });

  const categories = useMemo(() => {
    return ["All", ...(fetchedCategories || [])];
  }, [fetchedCategories]);

  // --- Event Handlers ---
  const updateQuantity = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }))
  }

  const handleBuyClick = (sweet: Sweet) => {
    // This function now just sets the state to open the dialog
    setSweetToBuy(sweet);
  }

  const handleConfirmPurchase = () => {
    if (!sweetToBuy) return;

    const quantity = quantities[sweetToBuy._id] || 1;
    // Call the mutate function from useMutation
    purchase({ sweetId: sweetToBuy._id, quantity });
  }

  // --- Render Logic ---
  if (isLoading && !initialSweets) return <div>Loading sweets...</div>
  if (error) {
    console.error("Error fetching sweets:", error);
    return <div>An error occurred: {error.message}</div>
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
                <SelectItem value="201-300">₹201 - ₹300</SelectItem>
                <SelectItem value="301-400">₹301 - ₹400</SelectItem>
                <SelectItem value="401-500">₹401 - ₹500</SelectItem>
                <SelectItem value="501+">₹501+</SelectItem>
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
          {sweets.map((sweet) => (
            <Card
              key={sweet._id} // Use MongoDB's _id
              className="overflow-hidden hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                <img src={"https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200"} alt={sweet.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{sweet.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary">{sweet.category}</Badge>
                  <span className="text-sm text-gray-600">{sweet.quantity} left</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(sweet._id, -1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-3 py-1 min-w-[2rem] text-center">{quantities[sweet._id] || 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(sweet._id, 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <AlertDialog open={sweetToBuy?._id === sweet._id} onOpenChange={(isOpen) => !isOpen && setSweetToBuy(null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => handleBuyClick(sweet)}
                        disabled={isPurchasing} // Disable button while purchasing
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 w-32"
                      >
                        {isPurchasing && sweetToBuy?._id === sweet._id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          `Buy ₹${sweet.price}`
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to buy {quantities[sweet._id] || 1} {sweet.name}(s)?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmPurchase}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}