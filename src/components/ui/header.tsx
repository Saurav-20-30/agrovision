
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

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
      <Link to="/auth">
        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
          <User className="h-5 w-5 text-gray-600" />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
