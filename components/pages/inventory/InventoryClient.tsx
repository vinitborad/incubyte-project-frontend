"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { Search, Plus, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

import Footer from "@/components/Footer"
import Header from "@/components/pages/inventory/Header"
import { Chatbot } from "@/components/Chatbot"
import { fetchCategories, searchSweets, Sweet, addSweet, restockSweet, deleteSweet } from "@/lib/api"
import { AddSweetDialog } from "./AddSweetDialog"

interface InventoryClientProps {
  initialSweets: Sweet[];
}

export function InventoryClient({ initialSweets }: InventoryClientProps) {
  const queryClient = useQueryClient();

  // --- State for Filters & Dialogs ---
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [stockToAdd, setStockToAdd] = useState("")
  const [selectedSweetId, setSelectedSweetId] = useState<string | null>(null)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)

  // --- Debounce & API Params ---
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const searchParams = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};
    if (debouncedSearchTerm) params.name = debouncedSearchTerm;
    if (selectedCategory !== "All") params.category = selectedCategory;
    if (priceRange !== "All") {
      const [min, max] = priceRange.split('-');
      if (min) params.minPrice = parseInt(min, 10);
      if (max) params.maxPrice = parseInt(max, 10);
    }
    return params;
  }, [debouncedSearchTerm, selectedCategory, priceRange]);

  // --- Data Fetching with TanStack Query ---
  const { data: sweets, isLoading } = useQuery<Sweet[]>({
    queryKey: ['sweets', searchParams],
    queryFn: () => searchSweets(searchParams),
    placeholderData: initialSweets,
  });

  const { data: fetchedCategories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = useMemo(() => {
    return ["All", ...(fetchedCategories || [])];
  }, [fetchedCategories]);

  // --- Mutations ---
  const { mutate: addSweetMutation, isPending: isAddingSweet } = useMutation({
    mutationFn: addSweet,
    onSuccess: () => {
      // On success, invalidate queries to refetch data and show the new sweet
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] }); // Also refetch categories
      // The dialog will close itself via its internal state management
    },
    onError: (error) => {
      alert(`Failed to add sweet: ${error.message}`);
    }
  });

  // Create the mutation for restocking a sweet
  const { mutate: restockMutation, isPending: isRestocking } = useMutation({
    mutationFn: restockSweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      // Close the dialog after success
      setIsAddStockOpen(false);
      setSelectedSweetId(null);
      setStockToAdd("");
    },
    onError: (error) => {
      alert(`Failed to add stock: ${error.message}`);
    }
  });

  // Create the mutation for deleting a sweet
  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteSweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
    onError: (error) => {
      alert(`Failed to delete sweet: ${error.message}`);
    }
  });

  // Function to refresh data that will be passed to the chatbot
  const handleRefreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['sweets'] });
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const handleDeleteSweet = (id: string) => {
    deleteMutation(id);
  }

  // 6. Update the handleAddStock function
  const handleAddStock = () => {
    const quantity = Number.parseInt(stockToAdd, 10);

    // Add validation for positive number and maximum limit
    if (!selectedSweetId || !quantity || quantity <= 0) {
      alert("Please enter a positive number for the quantity.");
      return;
    }

    if (quantity > 1000) {
      alert("Maximum 1000 units can be added at once.");
      return;
    }

    restockMutation({ sweetId: selectedSweetId, quantity });
  }

  const openAddStockDialog = (id: string) => {
    setSelectedSweetId(id)
    setIsAddStockOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-8">
          {/* --- This is your existing filter UI --- */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <AddSweetDialog
              categories={fetchedCategories || []}
              // @ts-expect-error - The complex type of useMutation's `mutate` function doesn't perfectly match the simple prop type.
              onFormSubmit={addSweetMutation}
              isPending={isAddingSweet}
            />

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

        {/* --- Sweets Grid (now using `sweets` from useQuery) --- */}
        {isLoading && <div>Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sweets?.map((sweet) => (
            <Card key={sweet._id} className="overflow-hidden hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <img src={process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE_URL || "https://preview-sweet-shop-website-kzmgz9143gm4tb6fo47l.vusercontent.net/placeholder.svg?height=200&width=200"} alt={sweet.name} className="w-full h-full object-cover" />
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
                    <span className={`font-semibold ${sweet.quantity < 10 ? "text-red-600" : "text-green-600"}`}>
                      {sweet.quantity} left
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold text-blue-600">₹{sweet.price}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog
                    open={isAddStockOpen && selectedSweetId === sweet._id}
                    onOpenChange={(isOpen) => {
                      setIsAddStockOpen(isOpen);
                      // If the dialog is closing, reset the state
                      if (!isOpen) {
                        setSelectedSweetId(null);
                        setStockToAdd("");
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openAddStockDialog(sweet._id)}>
                        Add Stock
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Stock for {sweet.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label htmlFor="stock">Quantity to Add</Label>
                          <Input
                            id="stock"
                            type="number"
                            placeholder="Enter quantity"
                            value={stockToAdd}
                            onChange={(e) => setStockToAdd(e.target.value)}
                            min="1"
                            max="1000"
                          />
                        </div>
                        {/* 7. Update the button to show loading state */}
                        <Button onClick={handleAddStock} disabled={isRestocking} className="w-full">
                          {isRestocking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                        <AlertDialogAction onClick={() => handleDeleteSweet(sweet._id)}>Delete</AlertDialogAction>
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
      <Chatbot onRefreshData={handleRefreshData} />
    </div>
  )
}