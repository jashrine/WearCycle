import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Droplet, Wind, Leaf, Recycle } from "lucide-react";

interface SustainabilityCounterProps {
  waterSaved?: number;
  co2Reduced?: number;
  energySaved?: number;
  wasteReduced?: number;
  totalRentals?: number;
}

const SustainabilityCounter = ({
  waterSaved = 12500,
  co2Reduced = 875,
  energySaved = 3200,
  wasteReduced = 450,
  totalRentals = 1250,
}: SustainabilityCounterProps) => {
  const [animatedWater, setAnimatedWater] = useState(0);
  const [animatedCO2, setAnimatedCO2] = useState(0);
  const [animatedEnergy, setAnimatedEnergy] = useState(0);
  const [animatedWaste, setAnimatedWaste] = useState(0);
  const [animatedRentals, setAnimatedRentals] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of steps in the animation
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;

      setAnimatedWater(Math.floor(waterSaved * progress));
      setAnimatedCO2(Math.floor(co2Reduced * progress));
      setAnimatedEnergy(Math.floor(energySaved * progress));
      setAnimatedWaste(Math.floor(wasteReduced * progress));
      setAnimatedRentals(Math.floor(totalRentals * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [waterSaved, co2Reduced, energySaved, wasteReduced, totalRentals]);

  const impactItems = [
    {
      icon: <Droplet className="h-8 w-8 text-blue-500" />,
      value: animatedWater,
      label: "Liters of Water Saved",
      color: "bg-blue-500",
      progress: (animatedWater / waterSaved) * 100,
    },
    {
      icon: <Wind className="h-8 w-8 text-gray-500" />,
      value: animatedCO2,
      label: "kg of CO2 Emissions Reduced",
      color: "bg-gray-500",
      progress: (animatedCO2 / co2Reduced) * 100,
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      value: animatedEnergy,
      label: "kWh of Energy Saved",
      color: "bg-green-500",
      progress: (animatedEnergy / energySaved) * 100,
    },
    {
      icon: <Recycle className="h-8 w-8 text-amber-500" />,
      value: animatedWaste,
      label: "kg of Textile Waste Reduced",
      color: "bg-amber-500",
      progress: (animatedWaste / wasteReduced) * 100,
    },
  ];

  return (
    <div className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Collective Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Together with our {animatedRentals.toLocaleString()} renters, we've
            made a significant positive impact on the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-md bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-1">
                    {item.value.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{item.label}</p>
                  <Progress
                    value={item.progress}
                    className="h-2"
                    indicatorClassName={item.color}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 italic">
            Calculations based on industry standards comparing rental vs. new
            production environmental impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityCounter;
