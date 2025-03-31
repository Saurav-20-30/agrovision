
import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header = ({ title, showBackButton = false, onBackClick }: HeaderProps) => {
  return (
    <div className="bg-white p-4 flex items-center border-b border-gray-200">
      {showBackButton && (
        <Button variant="ghost" size="sm" onClick={onBackClick} className="mr-2">
          ←
        </Button>
      )}
      <h1 className="text-xl font-bold flex-1">{title}</h1>
      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>
  );
};

export default Header;
