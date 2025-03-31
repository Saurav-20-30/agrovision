
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flower2, Leaf, Droplet, ThermometerSun, Upload } from "lucide-react";
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
  const [soilData, setSoilData] = useState<null | {
    phLevel: number;
    organicMatter: number;
    moisture: number;
    nitrogen: number;
    healthScore: number;
  }>(null);
  const [soilImage, setSoilImage] = useState<string | null>(null);
  
  const handleAddReading = () => {
    setShowInputForm(true);
  };
  
  const handleSubmitReading = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form values
    const form = e.target as HTMLFormElement;
    const phLevel = parseFloat((form.elements.namedItem('phLevel') as HTMLInputElement).value);
    const organicMatter = parseFloat((form.elements.namedItem('organicMatter') as HTMLInputElement).value);
    const moisture = parseFloat((form.elements.namedItem('moisture') as HTMLInputElement).value);
    const nitrogen = parseFloat((form.elements.namedItem('nitrogen') as HTMLInputElement).value);
    
    // Calculate a mock health score
    const healthScore = Math.round(
      (
        (phLevel >= 6.5 && phLevel <= 7.0 ? 100 : 70) +
        (organicMatter >= 3 ? 100 : organicMatter >= 2 ? 70 : 40) +
        (moisture >= 35 && moisture <= 45 ? 100 : 60) +
        (nitrogen >= 30 ? 100 : nitrogen >= 20 ? 70 : 40)
      ) / 4
    );
    
    // Set the soil data
    setSoilData({
      phLevel,
      organicMatter,
      moisture,
      nitrogen,
      healthScore
    });
    
    setShowInputForm(false);
    toast({
      title: "Soil Data Added",
      description: "Your soil analysis data has been saved",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSoilImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Soil Analysis" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        {!soilData && !soilImage ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Soil Data Available</h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Upload a soil sample image or add manual readings to see your soil analysis and get recommendations.
            </p>
            <div className="space-y-4 w-full max-w-md">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload soil sample image</p>
                    <label className="w-full">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                      <Button variant="outline" className="w-full">Select Image</Button>
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-500">OR</span>
              </div>
              
              <Button onClick={handleAddReading} className="w-full">
                Add Manual Reading
              </Button>
            </div>
          </div>
        ) : (
          <>
            {soilImage && (
              <div className="mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Soil Sample Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <img 
                        src={soilImage} 
                        alt="Soil Sample" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {soilData && (
              <>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Soil Health Overview</h2>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Health Score</CardTitle>
                      <CardDescription>Your soil quality rating</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">{soilData.healthScore}/100</span>
                        <Button variant="outline" size="sm" onClick={handleAddReading}>
                          Update Reading
                        </Button>
                      </div>
                      <Progress value={soilData.healthScore} className="h-2 mb-1" />
                      <p className="text-xs text-amber-600">
                        {soilData.healthScore >= 80 
                          ? "Excellent health" 
                          : soilData.healthScore >= 60 
                          ? "Moderate health - some improvements needed" 
                          : "Poor health - needs significant improvement"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Soil Properties</h2>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Flower2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">pH Level</h3>
                          <p className="text-sm text-muted-foreground">Current: {soilData.phLevel}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ${soilData.phLevel >= 6.5 && soilData.phLevel <= 7.0 ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                            {soilData.phLevel < 6.5 ? "Slightly Acidic" : soilData.phLevel > 7.0 ? "Slightly Alkaline" : "Optimal"}
                          </span>
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
                          <p className="text-sm text-muted-foreground">Current: {soilData.organicMatter}%</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ${soilData.organicMatter >= 3 ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                            {soilData.organicMatter >= 3 ? "Optimal" : "Low"}
                          </span>
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
                          <p className="text-sm text-muted-foreground">Current: {soilData.moisture}%</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ${soilData.moisture >= 35 && soilData.moisture <= 45 ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                            {soilData.moisture >= 35 && soilData.moisture <= 45 ? "Optimal" : soilData.moisture < 35 ? "Too Dry" : "Too Wet"}
                          </span>
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
                          <p className="text-sm text-muted-foreground">Current: {soilData.nitrogen} ppm</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ${soilData.nitrogen >= 30 ? 'text-green-600' : soilData.nitrogen >= 20 ? 'text-amber-600' : 'text-red-600'} font-medium`}>
                            {soilData.nitrogen >= 30 ? "Optimal" : soilData.nitrogen >= 20 ? "Moderate" : "Deficient"}
                          </span>
                          <p className="text-xs text-muted-foreground">Ideal: 30-40 ppm</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button className="w-full" variant="outline">
                    View Detailed Report
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        
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
                      name="phLevel"
                      step="0.1" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 6.5" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Organic Matter (%)</label>
                    <input 
                      type="number" 
                      name="organicMatter"
                      step="0.1" 
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 3.2" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Moisture (%)</label>
                    <input 
                      type="number" 
                      name="moisture"
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 40" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nitrogen (ppm)</label>
                    <input 
                      type="number" 
                      name="nitrogen"
                      className="w-full rounded-md border border-gray-300 p-2" 
                      placeholder="e.g. 25" 
                      required
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
