
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Sprout, ChartBar, Settings, MessageSquare } from "lucide-react";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-10">
      <Link to="/" className="flex flex-col items-center gap-1 text-primary">
        <Leaf className="h-5 w-5" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/scan" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary">
        <Leaf className="h-5 w-5" />
        <span className="text-xs">Scan</span>
      </Link>
      <Link to="/soil" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary">
        <Sprout className="h-5 w-5" />
        <span className="text-xs">Soil</span>
      </Link>
      <Link to="/yield" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary">
        <ChartBar className="h-5 w-5" />
        <span className="text-xs">Yield</span>
      </Link>
      <Link to="/chat" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary">
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs">Chat</span>
      </Link>
      <Link to="/settings" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary">
        <Settings className="h-5 w-5" />
        <span className="text-xs">Settings</span>
      </Link>
    </div>
  );
};

export default NavBar;
