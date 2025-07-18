"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

// --- Form Validation Schema using Zod ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(2, { message: "Category is required." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  quantity: z.coerce.number().int().nonnegative({ message: "Quantity must be a positive integer." }).max(1000, { message: "Maximum 1000 units can be added at once." }),
})

interface AddSweetDialogProps {
  categories: string[];
  onFormSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isPending: boolean;
}

export function AddSweetDialog({ categories, onFormSubmit, isPending }: AddSweetDialogProps) {
  const [open, setOpen] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      quantity: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onFormSubmit(values); // Wait for the API call to finish
      form.reset();              // Reset the form
      setOpen(false);            // Close the dialog
    } catch (error) {
      // If the API call fails, the dialog stays open for corrections.
      console.error("Submission failed:", error);
    }
  };

  // Close dialog and reset form when dialog is closed
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Sweet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Sweet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <form onSubmit={form.handleSubmit(onSubmit) as any} className="space-y-4">
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kaju Katli" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={form.control as any}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                          {field.value || "Select or type a category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search or create..."
                          value={categorySearch}
                          onValueChange={setCategorySearch}
                        />
                        <CommandList>
                          {categories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && categorySearch && (
                            <CommandItem
                              value={categorySearch}
                              onSelect={() => {
                                form.setValue("category", categorySearch);
                                setComboboxOpen(false);
                              }}
                            >
                              Create &quot;{categorySearch}&quot;
                            </CommandItem>
                          )}
                          <CommandGroup>
                            {categories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).map((category) => (
                              <CommandItem
                                value={category}
                                key={category}
                                onSelect={() => {
                                  form.setValue("category", category);
                                  setCategorySearch("");
                                  setComboboxOpen(false);
                                }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", category === field.value ? "opacity-100" : "opacity-0")} />
                                {category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={form.control as any}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={form.control as any}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" max={1000} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Sweet
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}