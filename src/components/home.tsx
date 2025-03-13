import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import OccasionCategories from "./OccasionCategories";
import FeaturedCollection from "./FeaturedCollection";
import SustainabilityCounter from "./SustainabilityCounter";
import Footer from "./Footer";
import { useState } from "react";
import ItemDetailModal from "./ItemDetailModal";

function Home() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: any, options: any) => {
    setCartItems([...cartItems, { ...item, options }]);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar cartItemCount={cartItems.length} />
      <HeroSection />
      <OccasionCategories />
      <FeaturedCollection
        onItemClick={handleItemClick}
        onQuickAdd={(item) => handleAddToCart(item, { size: item.size[0] })}
      />
      <SustainabilityCounter />
      <Footer />

      {selectedItem && (
        <ItemDetailModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          item={{
            id: selectedItem.id,
            name: selectedItem.name,
            description: selectedItem.name,
            images: [selectedItem.image],
            rentalPrice: selectedItem.rentalPrice,
            retailPrice: selectedItem.retailPrice,
            availableFrom: selectedItem.availableFrom,
            availableTo: selectedItem.availableTo,
            sizes: selectedItem.size,
            colors: [{ name: "Default", hex: "#9CAF88" }],
            category: selectedItem.category,
            occasion: selectedItem.category,
            brand: "WearCycle",
          }}
          onAddToCart={handleAddToCart}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;
