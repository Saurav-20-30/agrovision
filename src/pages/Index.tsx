
import React from "react";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Sprout, 
  ChartBar, 
  Image, 
  MessageSquare, 
  ArrowRight,
  Shield,
  Database,
  Zap 
} from "lucide-react";
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
          <div className="bg-gradient-to-r from-green-700/80 to-green-500/60 w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <div className="mb-6 text-center">
                <img 
                  src="/lovable-uploads/6d6552e6-42ca-4681-acff-67a50cba4a60.png" 
                  alt="AgroVision Logo" 
                  className="h-32 md:h-40 mx-auto" 
                />
              </div>
              <div className="p-6 text-white max-w-lg mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Cultivating Success through Intelligent Solutions</h1>
                <p className="mb-6">AgroVision AI helps farmers optimize yields, identify crop issues, and implement sustainable practices with cutting-edge artificial intelligence.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-white/90">
                    <Link to="/scan">Start Scanning <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    <Link to="/auth">Login / Register</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      {/* About AgroVision */}
      <div className="px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Revolutionizing Agriculture</h2>
          <p className="text-center text-gray-600 mb-8">
            AgroVision AI combines advanced machine learning with agricultural science to provide farmers with actionable insights and solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-green-700/10 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Crop Protection</h3>
              <p className="text-gray-600">Early detection of pests and diseases to prevent crop loss</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-green-700/10 p-3 rounded-full mb-4">
                <Database className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data-Driven Farming</h3>
              <p className="text-gray-600">Comprehensive analytics to optimize farm operations</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-green-700/10 p-3 rounded-full mb-4">
                <Zap className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">Personalized treatment plans based on your specific conditions</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 max-w-4xl mx-auto">Key Features</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
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
            linkTo="/treatment/guide" 
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
      
      {/* CTA Section */}
      <div className="bg-green-700/5 px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="mb-6">Join thousands of farmers who are already seeing improved yields and healthier crops.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white">
              <Link to="/auth">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-green-700 border-green-700 hover:bg-green-50">
              <Link to="/auth">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1"></div>
      <NavBar />
    </div>
  );
};

export default Index;
