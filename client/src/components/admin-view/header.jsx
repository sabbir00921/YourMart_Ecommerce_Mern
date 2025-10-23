import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";

const AdminHeader = ({ onOpenChange }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => onOpenChange(true)}>
        <Menu />
        <span className="sr-only">Toogle Meue</span>
      </Button>
      <div className="flex-1 flex justify-end"></div>
      <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
        <LogOut />
        Logout
      </Button>
    </header>
  );
};

export default AdminHeader;
