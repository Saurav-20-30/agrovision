
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Home,
  Settings,
  Leaf,
  Sprout,
  ChartBar,
  MessageSquare,
  LogIn,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu = ({ isOpen, onClose }: SidebarMenuProps) => {
  const menuItems = [
    { name: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Scan Crops", icon: <Leaf className="h-5 w-5" />, path: "/scan" },
    { name: "Soil Analysis", icon: <Sprout className="h-5 w-5" />, path: "/soil" },
    { name: "Yield Tracking", icon: <ChartBar className="h-5 w-5" />, path: "/yield" },
    { name: "AI Assistant", icon: <MessageSquare className="h-5 w-5" />, path: "/chat" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
    { name: "Login/Register", icon: <LogIn className="h-5 w-5" />, path: "/auth" },
  ];

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform"
      style={{
        boxShadow: "10px 0 15px rgba(0,0,0,0.1)",
        perspective: "1000px",
      }}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">AgroVision AI</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mr-3 text-primary"
                  >
                    {item.icon}
                  </motion.div>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center p-3">
            <User className="h-5 w-5 mr-3 text-gray-500" />
            <span className="text-sm text-gray-600">Guest User</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Drawer version of the sidebar
export const MobileSidebarMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">AgroVision AI</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-3 rounded-md hover:bg-gray-100">
                <Home className="h-5 w-5 mr-3 text-primary" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/scan" className="flex items-center p-3 rounded-md hover:bg-gray-100">
                <Leaf className="h-5 w-5 mr-3 text-primary" />
                <span>Scan Crops</span>
              </Link>
            </li>
            <li>
              <Link to="/soil" className="flex items-center p-3 rounded-md hover:bg-gray-100">
                <Sprout className="h-5 w-5 mr-3 text-primary" />
                <span>Soil Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/auth" className="flex items-center p-3 rounded-md hover:bg-gray-100">
                <LogIn className="h-5 w-5 mr-3 text-primary" />
                <span>Login/Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarMenu;
