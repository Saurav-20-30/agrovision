
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarMenu, { MobileSidebarMenu } from "@/components/ui/sidebar-menu";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header = ({ title, showBackButton = false, onBackClick }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-white p-4 flex items-center border-b border-gray-200">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="mr-2 hidden md:flex"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <MobileSidebarMenu />
        
        {showBackButton && (
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-2">
            ←
          </Button>
        )}
        
        <h1 className="text-xl font-bold flex-1">{title}</h1>
        
        <Link to="/auth">
          <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </Link>
      </div>
      
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
