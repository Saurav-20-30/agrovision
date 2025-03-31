
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Soil, Leaf, Droplet, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SoilAnalysisPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showInputForm, setShowInputForm] = useState(false);
  
  const handleAddReading = () => {
    setShowInputForm(true);
  };
  
  const handleSubmitReading = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInputForm(false);
    toast({
      title: "Soil Data Added",
      description: "Your soil analysis data has been saved",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Soil Analysis" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Soil Health Overview</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Health Score</CardTitle>
              <CardDescription>Your soil quality rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">68/100</span>
                <Button variant="outline" size="sm" onClick={handleAddReading}>
                  Add Reading
                </Button>
              </div>
              <Progress value={68} className="h-2 mb-1" />
              <p className="text-xs text-amber-600">Moderate health - needs improvement</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Soil Properties</h2>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Soil className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">pH Level</h3>
                  <p className="text-sm text-muted-foreground">Current: 6.2</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-amber-600 font-medium">Slightly Acidic</span>
                  <p className="text-xs text-muted-foreground">Ideal: 6.5-7.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Organic Matter</h3>
                  <p className="text-sm text-muted-foreground">Current: 2.3%</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-amber-600 font-medium">Low</span>
                  <p className="text-xs text-muted-foreground">Ideal: 3-5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Droplet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Moisture</h3>
                  <p className="text-sm text-muted-foreground">Current: 40%</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-600 font-medium">Optimal</span>
                  <p className="text-xs text-muted-foreground">Ideal: 35-45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ThermometerSun className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Nitrogen (N)</h3>
                  <p className="text-sm text-muted-foreground">Current: 15 ppm</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-red-600 font-medium">Deficient</span>
                  <p className="text-xs text-muted-foreground">Ideal: 30-40 ppm</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full" variant="outline">
            View Detailed Report
          </Button>
        </div>
        
        {showInputForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-4">
              <h2 className="text-lg font-bold mb-4">Add New Soil Reading</h2>
              <form onSubmit={handleSubmitReading}>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">pH Level</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 6.5" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Organic Matter (%)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 3.2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Moisture (%)</label>
                    <input 
                      type="number" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 40" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nitrogen (ppm)</label>
                    <input 
                      type="number" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 25" 
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowInputForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save Reading
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default SoilAnalysisPage;
