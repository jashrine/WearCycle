import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface OccasionCategoryProps {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  onClick?: (id: string) => void;
}

interface OccasionCategoriesProps {
  categories?: OccasionCategoryProps[];
  onCategorySelect?: (id: string) => void;
  title?: string;
  subtitle?: string;
}

const OccasionCategories = ({
  categories = [
    {
      id: "wedding",
      name: "Wedding",
      image:
        "https://images.unsplash.com/photo-1516685018646-549198525c1b?w=400&q=80",
      itemCount: 42,
    },
    {
      id: "gala",
      name: "Gala & Formal",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
      itemCount: 36,
    },
    {
      id: "interview",
      name: "Interview",
      image:
        "https://images.unsplash.com/photo-1580913428023-02c695666d61?w=400&q=80",
      itemCount: 28,
    },
    {
      id: "vacation",
      name: "Vacation",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
      itemCount: 53,
    },
    {
      id: "date-night",
      name: "Date Night",
      image:
        "https://images.unsplash.com/photo-1529634506268-b4e99ab08bbd?w=400&q=80",
      itemCount: 31,
    },
    {
      id: "business",
      name: "Business Casual",
      image:
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
      itemCount: 45,
    },
    {
      id: "party",
      name: "Party",
      image:
        "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=400&q=80",
      itemCount: 39,
    },
  ],
  onCategorySelect = (id) => console.log(`Category selected: ${id}`),
  title = "Shop by Occasion",
  subtitle = "Find the perfect outfit for your next event",
}: OccasionCategoriesProps) => {
  return (
    <div className="w-full py-12 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex space-x-4 pb-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategorySelect(category.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  category: OccasionCategoryProps;
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <Card
      className="min-w-[240px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md bg-white"
      onClick={onClick}
    >
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-medium text-lg">{category.name}</h3>
          <p className="text-sm text-gray-200">{category.itemCount} items</p>
        </div>
      </div>
      <CardContent className="p-3">
        <Button
          variant="ghost"
          className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Browse Collection
        </Button>
      </CardContent>
    </Card>
  );
};

export default OccasionCategories;
