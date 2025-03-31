
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Sprout, ChartBar, Image, MessageSquare } from "lucide-react";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";
import FeatureCard from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="AgroVision AI" />
      
      {/* Hero section */}
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <div className="bg-accent w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
              <div className="p-6 text-white max-w-md">
                <h1 className="text-3xl font-bold mb-2">Optimize Your Farm</h1>
                <p className="mb-4">Scan crops, analyze soil, and boost your yields with AI-powered insights</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/scan">Scan Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      {/* Features */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FeatureCard 
            title="Crop Scanning" 
            description="Identify crop health issues and get treatment recommendations" 
            icon={Image} 
            linkTo="/scan" 
          />
          <FeatureCard 
            title="Soil Analysis" 
            description="Test and improve your soil quality for better growth" 
            icon={Sprout} 
            linkTo="/soil" 
          />
          <FeatureCard 
            title="Treatment Guide" 
            description="Personalized treatments for your specific crop issues" 
            icon={Leaf} 
            linkTo="/treatment" 
          />
          <FeatureCard 
            title="Yield Tracking" 
            description="Monitor and optimize your farm's performance" 
            icon={ChartBar} 
            linkTo="/yield" 
          />
          <FeatureCard 
            title="AI Assistant" 
            description="Get expert farming advice with our AI chatbot" 
            icon={MessageSquare} 
            linkTo="/chat" 
          />
        </div>
      </div>
      
      <div className="flex-1"></div>
      <NavBar />
    </div>
  );
};

export default Index;
