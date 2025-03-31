
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Camera, Image, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";

const ScanPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've identified issues with your crop",
      });
    }, 2000);
  };
  
  const handleCameraCapture = () => {
    // In a real app, this would trigger the device camera
    toast({
      title: "Camera Access",
      description: "Camera functionality would open here",
    });
  };
  
  const navigateToTreatment = () => {
    navigate("/treatment/wheat-rust");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Scan Crops" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-2">Upload or Take a Photo</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Take a clear photo of your crop to identify issues and get treatment recommendations
          </p>
          
          <div className="flex gap-2 mb-4">
            <Button 
              variant="outline" 
              className="flex-1 h-20"
              onClick={handleCameraCapture}
            >
              <div className="flex flex-col items-center">
                <Camera className="h-6 w-6 mb-1" />
                <span>Camera</span>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 h-20"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <div className="flex flex-col items-center">
                <Upload className="h-6 w-6 mb-1" />
                <span>Upload</span>
              </div>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
          
          {selectedImage && (
            <div className="mb-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Selected crop" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <Button 
                className="w-full mt-2" 
                onClick={handleAnalyzeImage}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Recent Scans</h2>
          <div className="text-center py-8 text-muted-foreground">
            <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent scans</p>
          </div>
        </div>
      </div>
      
      <NavBar />
      
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Results</DialogTitle>
            <DialogDescription>
              We've analyzed your crop image
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
              <h3 className="font-semibold text-red-700 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Wheat Rust Detected
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Orange-brown pustules on leaves and stems. 70% confidence.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
              <h3 className="font-semibold text-yellow-700 flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Nutrient Deficiency
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Signs of potassium deficiency in lower leaves. 65% confidence.
              </p>
            </div>
            
            <Button 
              onClick={navigateToTreatment} 
              className="w-full"
            >
              View Treatment Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanPage;
