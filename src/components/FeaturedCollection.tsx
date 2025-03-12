import React, { useState } from "react";
import RentalItemCard from "./RentalItemCard";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface RentalItem {
  id: string;
  image: string;
  name: string;
  rentalPrice: number;
  retailPrice: number;
  availableFrom: Date;
  availableTo: Date;
  category: string;
  occasion: string;
  size: string[];
}

interface FeaturedCollectionProps {
  title?: string;
  items?: RentalItem[];
  onItemClick?: (item: RentalItem) => void;
  onQuickAdd?: (item: RentalItem) => void;
}

const FeaturedCollection = ({
  title = "Featured Collection",
  items = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      name: "Floral Summer Dress",
      rentalPrice: 45,
      retailPrice: 189,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: "Dresses",
      occasion: "Casual",
      size: ["XS", "S", "M", "L"],
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&q=80",
      name: "Black Evening Gown",
      rentalPrice: 75,
      retailPrice: 299,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      category: "Dresses",
      occasion: "Formal",
      size: ["S", "M", "L", "XL"],
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
      name: "Men's Business Suit",
      rentalPrice: 95,
      retailPrice: 450,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category: "Suits",
      occasion: "Business",
      size: ["38R", "40R", "42R", "44R"],
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1596285508507-5da6bec59433?w=400&q=80",
      name: "Cocktail Dress",
      rentalPrice: 55,
      retailPrice: 220,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      category: "Dresses",
      occasion: "Party",
      size: ["XS", "S", "M"],
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1617551307578-7f5160d6615e?w=400&q=80",
      name: "Wedding Guest Outfit",
      rentalPrice: 85,
      retailPrice: 340,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      category: "Dresses",
      occasion: "Wedding",
      size: ["S", "M", "L"],
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
      name: "Summer Jumpsuit",
      rentalPrice: 40,
      retailPrice: 160,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: "Jumpsuits",
      occasion: "Casual",
      size: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80",
      name: "Vintage Blazer",
      rentalPrice: 50,
      retailPrice: 200,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category: "Outerwear",
      occasion: "Business",
      size: ["S", "M", "L"],
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
      name: "Designer Handbag",
      rentalPrice: 65,
      retailPrice: 950,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: "Accessories",
      occasion: "Any",
      size: ["One Size"],
    },
  ],
  onItemClick = () => {},
  onQuickAdd = () => {},
}: FeaturedCollectionProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    occasions: string[];
    sizes: string[];
  }>({
    categories: [],
    occasions: [],
    sizes: [],
  });

  // Extract unique categories, occasions, and sizes for filters
  const categories = [...new Set(items.map((item) => item.category))];
  const occasions = [...new Set(items.map((item) => item.occasion))];
  const sizes = [...new Set(items.flatMap((item) => item.size))];

  // Filter items based on active tab, search query, and filters
  const filteredItems = items.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.category.toLowerCase() !== activeTab) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    if (
      item.rentalPrice < priceRange[0] ||
      item.rentalPrice > priceRange[1] * 10
    ) {
      return false;
    }

    // Filter by selected categories
    if (
      selectedFilters.categories.length > 0 &&
      !selectedFilters.categories.includes(item.category)
    ) {
      return false;
    }

    // Filter by selected occasions
    if (
      selectedFilters.occasions.length > 0 &&
      !selectedFilters.occasions.includes(item.occasion)
    ) {
      return false;
    }

    // Filter by selected sizes (if any size matches)
    if (
      selectedFilters.sizes.length > 0 &&
      !item.size.some((size) => selectedFilters.sizes.includes(size))
    ) {
      return false;
    }

    return true;
  });

  const toggleFilter = (
    type: "categories" | "occasions" | "sizes",
    value: string,
  ) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]];
      const index = current.indexOf(value);

      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }

      return { ...prev, [type]: current };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      occasions: [],
      sizes: [],
    });
    setPriceRange([0, 100]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedFilters.categories.length > 0 ||
    selectedFilters.occasions.length > 0 ||
    selectedFilters.sizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100 ||
    searchQuery !== "";

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">
              Discover our curated collection of sustainable fashion rentals
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Items</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Price Range ($ per rental)
                    </h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        value={priceRange}
                        max={100}
                        step={5}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1] * 10}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            selectedFilters.categories.includes(category)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleFilter("categories", category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Occasion Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Occasions</h3>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((occasion) => (
                        <Badge
                          key={occasion}
                          variant={
                            selectedFilters.occasions.includes(occasion)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleFilter("occasions", occasion)}
                        >
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <Badge
                          key={size}
                          variant={
                            selectedFilters.sizes.includes(size)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleFilter("sizes", size)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedFilters.categories.map((category) => (
              <Badge
                key={`cat-${category}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleFilter("categories", category)}
                />
              </Badge>
            ))}
            {selectedFilters.occasions.map((occasion) => (
              <Badge
                key={`occ-${occasion}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {occasion}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleFilter("occasions", occasion)}
                />
              </Badge>
            ))}
            {selectedFilters.sizes.map((size) => (
              <Badge
                key={`size-${size}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Size: {size}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleFilter("sizes", size)}
                />
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 100) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                ${priceRange[0]} - ${priceRange[1] * 10}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 100])}
                />
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                "{searchQuery}"
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="dresses">Dresses</TabsTrigger>
            <TabsTrigger value="suits">Suits</TabsTrigger>
            <TabsTrigger value="outerwear">Outerwear</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {/* Items Grid - will be the same for all tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    rentalPrice={item.rentalPrice}
                    retailPrice={item.retailPrice}
                    availableFrom={item.availableFrom}
                    availableTo={item.availableTo}
                    category={item.category}
                    size={item.size}
                    onViewDetails={() => onItemClick(item)}
                    onQuickAdd={() => onQuickAdd(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No items match your current filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Other tabs will use the same grid layout with filtered items */}
          <TabsContent value="dresses" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    rentalPrice={item.rentalPrice}
                    retailPrice={item.retailPrice}
                    availableFrom={item.availableFrom}
                    availableTo={item.availableTo}
                    category={item.category}
                    size={item.size}
                    onViewDetails={() => onItemClick(item)}
                    onQuickAdd={() => onQuickAdd(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No dresses match your current filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="suits" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    rentalPrice={item.rentalPrice}
                    retailPrice={item.retailPrice}
                    availableFrom={item.availableFrom}
                    availableTo={item.availableTo}
                    category={item.category}
                    size={item.size}
                    onViewDetails={() => onItemClick(item)}
                    onQuickAdd={() => onQuickAdd(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No suits match your current filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="outerwear" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    rentalPrice={item.rentalPrice}
                    retailPrice={item.retailPrice}
                    availableFrom={item.availableFrom}
                    availableTo={item.availableTo}
                    category={item.category}
                    size={item.size}
                    onViewDetails={() => onItemClick(item)}
                    onQuickAdd={() => onQuickAdd(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No outerwear items match your current filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    rentalPrice={item.rentalPrice}
                    retailPrice={item.retailPrice}
                    availableFrom={item.availableFrom}
                    availableTo={item.availableTo}
                    category={item.category}
                    size={item.size}
                    onViewDetails={() => onItemClick(item)}
                    onQuickAdd={() => onQuickAdd(item)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No accessories match your current filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More Button */}
        {filteredItems.length > 8 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCollection;
