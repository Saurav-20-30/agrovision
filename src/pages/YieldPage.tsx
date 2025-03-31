
import React, { useState } from "react";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/nav-bar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChartBar, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface CropData {
  name: string;
  plantsPerAcre: number;
  waterRequirements: string;
  growthDuration: string;
  soilTypes: string;
}

const crops: CropData[] = [
  { 
    name: "Rice", 
    plantsPerAcre: 175000,
    waterRequirements: "High",
    growthDuration: "3-6 months",
    soilTypes: "Clay or clayey loam"
  },
  { 
    name: "Wheat", 
    plantsPerAcre: 1000000,
    waterRequirements: "Medium",
    growthDuration: "4-5 months",
    soilTypes: "Loam or clay loam" 
  },
  { 
    name: "Maize (Corn)", 
    plantsPerAcre: 20000,
    waterRequirements: "Medium",
    growthDuration: "3-4 months",
    soilTypes: "Well-drained loamy" 
  },
  { 
    name: "Cotton", 
    plantsPerAcre: 40000,
    waterRequirements: "Medium",
    growthDuration: "5-6 months",
    soilTypes: "Well-drained black soils" 
  },
  { 
    name: "Sugarcane", 
    plantsPerAcre: 15000,
    waterRequirements: "High",
    growthDuration: "12-18 months",
    soilTypes: "Deep, well-drained loamy" 
  },
  { 
    name: "Potato", 
    plantsPerAcre: 58000,
    waterRequirements: "Medium",
    growthDuration: "3-4.5 months",
    soilTypes: "Sandy loam" 
  },
  { 
    name: "Tomato", 
    plantsPerAcre: 10000,
    waterRequirements: "Medium",
    growthDuration: "3-4 months",
    soilTypes: "Well-drained loamy" 
  },
  { 
    name: "Onion", 
    plantsPerAcre: 150000,
    waterRequirements: "Medium",
    growthDuration: "3-5 months",
    soilTypes: "Sandy loam to clay loam" 
  }
];

const YieldPage = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acres");
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    totalPlants: number;
    crop: CropData | null;
  } | null>(null);

  const handleCalculate = () => {
    if (!area || !selectedCrop) return;

    const numericArea = parseFloat(area);
    if (isNaN(numericArea) || numericArea <= 0) return;

    const crop = crops.find(c => c.name === selectedCrop) || null;
    if (!crop) return;

    // Convert to acres if necessary
    let areaInAcres = numericArea;
    if (unit === "hectares") {
      areaInAcres = numericArea * 2.47105; // 1 hectare = 2.47105 acres
    } else if (unit === "sqft") {
      areaInAcres = numericArea / 43560; // 1 acre = 43,560 sq ft
    } else if (unit === "sqm") {
      areaInAcres = numericArea / 4046.86; // 1 acre = 4,046.86 sq m
    }

    const totalPlants = Math.round(crop.plantsPerAcre * areaInAcres);
    setCalculationResult({ totalPlants, crop });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Yield Calculator" showBackButton onBackClick={() => navigate("/")} />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Calculate Planting Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="area">Land Area</Label>
                <div className="flex gap-2">
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="sqft">Square Feet</SelectItem>
                      <SelectItem value="sqm">Square Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crop">Select Crop</Label>
                <Select value={selectedCrop || ""} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop.name} value={crop.name}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleCalculate} 
                className="w-full"
                disabled={!area || !selectedCrop}
              >
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {calculationResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-primary" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Estimated number of plants for your land:</p>
                  <p className="text-3xl font-bold text-primary">
                    {calculationResult.totalPlants.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium">{calculationResult.crop?.name} plants</p>
                </div>
                
                {calculationResult.crop && (
                  <div className="space-y-3 mt-4">
                    <h3 className="font-medium">Crop Information:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-100 p-2 rounded">
                        <p className="text-gray-500">Water Need</p>
                        <p className="font-medium">{calculationResult.crop.waterRequirements}</p>
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <p className="text-gray-500">Growth Period</p>
                        <p className="font-medium">{calculationResult.crop.growthDuration}</p>
                      </div>
                      <div className="bg-gray-100 p-2 rounded col-span-2">
                        <p className="text-gray-500">Suitable Soil Types</p>
                        <p className="font-medium">{calculationResult.crop.soilTypes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default YieldPage;
