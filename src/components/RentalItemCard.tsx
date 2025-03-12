import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface RentalItemCardProps {
  image?: string;
  name?: string;
  rentalPrice?: number;
  retailPrice?: number;
  availableFrom?: Date;
  availableTo?: Date;
  category?: string;
  size?: string[];
  onQuickAdd?: () => void;
  onViewDetails?: () => void;
  onWishlist?: () => void;
}

const RentalItemCard = ({
  image = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  name = "Floral Summer Dress",
  rentalPrice = 2500,
  retailPrice = 10500,
  availableFrom = new Date(),
  availableTo = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  category = "Summer",
  size = ["XS", "S", "M", "L"],
  onQuickAdd = () => {},
  onViewDetails = () => {},
  onWishlist = () => {},
}: RentalItemCardProps) => {
  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Calculate savings percentage
  const savingsPercent = Math.round(
    ((retailPrice - rentalPrice) / retailPrice) * 100,
  );

  return (
    <Card className="w-full max-w-xs h-[512px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-[300px] overflow-hidden group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700">
          Save {savingsPercent}%
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
                onClick={onWishlist}
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to wishlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg truncate">{name}</h3>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">₱{rentalPrice}</span>
          <span className="text-sm text-gray-500 line-through">
            ₱{retailPrice}
          </span>
          <span className="text-xs text-gray-500">/ 4-day rental</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            Available {formatDate(availableFrom)} - {formatDate(availableTo)}
          </span>
        </div>

        <div className="flex gap-1 mt-2">
          {size.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onViewDetails}>
          View Details
        </Button>
        <Button
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          onClick={onQuickAdd}
        >
          Quick Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RentalItemCard;
