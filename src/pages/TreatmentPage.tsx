
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";
import { Card, CardContent } from "@/components/ui/card";

const TreatmentPage = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  
  // In a real app, this would come from an API or database
  const treatmentData = {
    "wheat-rust": {
      name: "Wheat Rust",
      severity: "High",
      description: "Wheat rust is a fungal disease that affects wheat and barley. It appears as orange-brown pustules on leaves and stems and can significantly reduce crop yields.",
      treatments: [
        {
          title: "Apply Fungicide",
          description: "Use a triazole or strobilurin fungicide. Apply early in the morning when dew is present for best absorption.",
          priority: "high",
        },
        {
          title: "Improve Air Circulation",
          description: "Reduce plant density in affected areas to improve air circulation and decrease humidity levels around plants.",
          priority: "medium",
        },
        {
          title: "Resistant Varieties",
          description: "For future plantings, choose wheat varieties with genetic resistance to rust pathogens.",
          priority: "medium",
        }
      ],
      prevention: [
        "Rotate crops with non-hosts to break disease cycle",
        "Plant resistant varieties when available",
        "Ensure proper plant spacing for adequate air circulation",
        "Remove and destroy infected plant debris after harvest"
      ]
    }
  };
  
  const issueData = treatmentData[issueId as keyof typeof treatmentData] || {
    name: "Unknown Issue",
    severity: "Unknown",
    description: "No information available for this issue.",
    treatments: [],
    prevention: []
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Treatment Plan" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full mt-1">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{issueData.name}</h2>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  {issueData.severity} Severity
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {issueData.description}
              </p>
            </div>
          </div>
          
          <img 
            src="https://cdn-images-1.medium.com/max/800/1*YV_kK0R6aG1Thev_m6dwrw.jpeg" 
            alt="Disease Example" 
            className="w-full h-40 object-cover rounded-lg mb-4" 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="bg-primary/10 p-1 rounded">
              <Check className="h-4 w-4 text-primary" />
            </span>
            Recommended Treatment
          </h3>
          
          <div className="space-y-3">
            {issueData.treatments.map((treatment, index) => (
              <Card key={index} className={`border-l-4 ${
                treatment.priority === 'high' 
                  ? 'border-l-red-500' 
                  : treatment.priority === 'medium'
                    ? 'border-l-amber-500'
                    : 'border-l-blue-500'
              }`}>
                <CardContent className="p-3">
                  <h4 className="font-medium">{treatment.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="bg-primary/10 p-1 rounded">
              <Info className="h-4 w-4 text-primary" />
            </span>
            Prevention Tips
          </h3>
          
          <ul className="space-y-2">
            {issueData.prevention.map((tip, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button className="w-full">
          Mark as Treated
        </Button>
      </div>
      
      <NavBar />
    </div>
  );
};

export default TreatmentPage;
