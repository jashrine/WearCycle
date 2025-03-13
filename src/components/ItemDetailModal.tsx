import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Check,
  Info,
  Truck,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";

interface ItemDetailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item?: {
    id: string;
    name: string;
    description: string;
    images: string[];
    rentalPrice: number;
    retailPrice: number;
    availableFrom: Date;
    availableTo: Date;
    sizes: string[];
    colors: { name: string; hex: string }[];
    category: string;
    occasion: string;
    brand: string;
  };
  onAddToCart?: (item: any, selectedOptions: any) => void;
  onClose?: () => void;
}

const ItemDetailModal = ({
  open = true,
  onOpenChange = () => {},
  item = {
    id: "dress-001",
    name: "Floral Summer Maxi Dress",
    description:
      "A beautiful floral maxi dress perfect for summer events. Made with sustainable materials and designed for comfort and style.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
    ],
    rentalPrice: 45,
    retailPrice: 189,
    availableFrom: new Date(),
    availableTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral Pink", hex: "#FFB6C1" },
      { name: "Sage Green", hex: "#9CAF88" },
    ],
    category: "Dresses",
    occasion: "Summer",
    brand: "EcoChic",
  },
  onAddToCart = () => {},
  onClose = () => {},
}: ItemDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedReturnDate, setSelectedReturnDate] = useState<
    Date | undefined
  >(undefined);
  const [rentalDuration, setRentalDuration] = useState<string>("4");

  // Calculate savings percentage
  const savingsPercent = Math.round(
    ((item.retailPrice - item.rentalPrice) / item.retailPrice) * 100,
  );

  // Format dates for display
  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + item.images.length) % item.images.length,
    );
  };

  // Handle rental duration change
  const handleRentalDurationChange = (value: string) => {
    setRentalDuration(value);
    if (selectedDate) {
      const returnDate = new Date(selectedDate);
      returnDate.setDate(returnDate.getDate() + parseInt(value));
      setSelectedReturnDate(returnDate);
    }
  };

  // Handle pickup date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const returnDate = new Date(date);
      returnDate.setDate(returnDate.getDate() + parseInt(rentalDuration));
      setSelectedReturnDate(returnDate);
    } else {
      setSelectedReturnDate(undefined);
    }
  };

  // Check if add to cart button should be enabled
  const isAddToCartEnabled =
    selectedSize && selectedColor && selectedDate && selectedReturnDate;

  // Handle add to cart
  const handleAddToCart = () => {
    if (isAddToCartEnabled) {
      onAddToCart(item, {
        size: selectedSize,
        color: selectedColor,
        rentalStart: selectedDate,
        rentalEnd: selectedReturnDate,
        duration: rentalDuration,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left side - Image gallery */}
          <div className="relative h-[500px] md:h-[600px] bg-gray-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={item.images[currentImageIndex]}
                alt={item.name}
                className="object-cover h-full w-full"
              />
            </div>

            {/* Image navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-black" : "bg-gray-300"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>

            {/* Save percentage badge */}
            <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-600">
              Save {savingsPercent}%
            </Badge>
          </div>

          {/* Right side - Item details and options */}
          <div className="p-6 overflow-y-auto max-h-[600px]">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {item.category}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold">
                    {item.name}
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold">₱{item.rentalPrice}</span>
              <span className="text-gray-500 line-through">
                ₱{item.retailPrice}
              </span>
              <span className="text-sm text-gray-500">
                / {rentalDuration}-day rental
              </span>
            </div>

            <p className="mt-4 text-gray-700">{item.description}</p>

            <Separator className="my-6" />

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="booking">Book Now</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-2">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {item.colors.map((color) => (
                      <div
                        key={color.name}
                        className="flex flex-col items-center gap-1"
                        onClick={() => setSelectedColor(color.name)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color.name ? "border-black" : "border-transparent"}`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {selectedColor === color.name && (
                            <div className="flex items-center justify-center h-full">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>
                      Available {formatDate(item.availableFrom)} -{" "}
                      {formatDate(item.availableTo)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-md">
                  <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Rental Information</p>
                    <p className="text-xs text-gray-600 mt-1">
                      All rentals include free shipping both ways, insurance
                      against minor damages, and professional cleaning.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="booking" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-medium mb-3">Select Rental Duration</h3>
                  <RadioGroup
                    value={rentalDuration}
                    onValueChange={handleRentalDurationChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="r1" />
                      <Label htmlFor="r1">4 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8" id="r2" />
                      <Label htmlFor="r2">8 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="16" id="r3" />
                      <Label htmlFor="r3">16 Days</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Select Pickup Date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) =>
                          date < item.availableFrom ||
                          date > item.availableTo ||
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {selectedDate && selectedReturnDate && (
                    <div className="mt-2 text-sm text-gray-600 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Return by: {format(selectedReturnDate, "PPP")}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Select Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {item.colors.map((color) => (
                      <div
                        key={color.name}
                        className="flex flex-col items-center gap-1"
                        onClick={() => setSelectedColor(color.name)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color.name ? "border-black" : "border-transparent"}`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {selectedColor === color.name && (
                            <div className="flex items-center justify-center h-full">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!isAddToCartEnabled}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
