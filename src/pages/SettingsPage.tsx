
import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, User, Bell, HelpCircle, LogOut } from "lucide-react";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Settings" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4 flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
            <div>
              <h2 className="font-semibold">John Farmer</h2>
              <p className="text-sm text-muted-foreground">Premium Account</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Button variant="outline" size="sm" className="w-full">
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Account Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Personal Information</span>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Notifications</span>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-gray-500 mr-3" />
                  <span>App Preferences</span>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span>Weather Alerts</span>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <span>Scan History Sync</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Support</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Help & Support</span>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>About AgroVision AI</span>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <NavBar />
    </div>
  );
};

export default SettingsPage;
