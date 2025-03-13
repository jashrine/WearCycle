import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface NavbarProps {
  logo?: string;
  cartItemCount?: number;
  onSearchSubmit?: (searchTerm: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onWishlistClick?: () => void;
}

const Navbar = ({
  logo = "WearCycle",
  cartItemCount = 2,
  onSearchSubmit = () => {},
  onCartClick = () => {},
  onProfileClick = () => {},
  onWishlistClick = () => {},
}: NavbarProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const categories = [
    { name: "New Arrivals", href: "/new" },
    { name: "Dresses", href: "/dresses" },
    { name: "Tops", href: "/tops" },
    { name: "Bottoms", href: "/bottoms" },
    { name: "Outerwear", href: "/outerwear" },
    { name: "Accessories", href: "/accessories" },
  ];

  const occasions = [
    { name: "Wedding", href: "/occasions/wedding" },
    { name: "Gala", href: "/occasions/gala" },
    { name: "Interview", href: "/occasions/interview" },
    { name: "Date Night", href: "/occasions/date-night" },
    { name: "Vacation", href: "/occasions/vacation" },
  ];

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <Link to="/" className="font-bold text-xl">
                    {logo}
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-1">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-gray-500 uppercase text-sm">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <Link
                            to={category.href}
                            className="block py-2 hover:text-emerald-600 transition-colors"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-gray-500 uppercase text-sm">
                      Occasions
                    </h3>
                    <ul className="space-y-2">
                      {occasions.map((occasion) => (
                        <li key={occasion.name}>
                          <Link
                            to={occasion.href}
                            className="block py-2 hover:text-emerald-600 transition-colors"
                          >
                            {occasion.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
                <div className="py-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full mb-2"
                    onClick={onProfileClick}
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onWishlistClick}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/wearcycle.png" alt="WearCycle Logo" className="h-8 w-8" />
          <span className="font-bold text-2xl text-emerald-600">{logo}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Occasions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {occasions.map((occasion) => (
                      <li key={occasion.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={occasion.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          >
                            <div className="text-sm font-medium leading-none">
                              {occasion.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/sustainability"
                  className="block py-2 px-3 hover:text-emerald-600 transition-colors"
                >
                  Sustainability
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/how-it-works"
                  className="block py-2 px-3 hover:text-emerald-600 transition-colors"
                >
                  How It Works
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative"
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={onProfileClick}
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={onWishlistClick}
          >
            <Heart className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={onCartClick}>
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-emerald-600"
                  variant="default"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-50 border-t border-gray-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
