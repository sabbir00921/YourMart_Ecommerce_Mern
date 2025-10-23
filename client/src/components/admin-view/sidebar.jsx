import {
  ChartNoAxesCombined,
  Expand,
  LayoutDashboard,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AdminSidebar = ({ open, setOpen }) => {
  const admoinSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "features",
      label: "Features",
      path: "/admin/features",
      icon: <Expand />,
    },
  ];

  const navigate = useNavigate();
  function menuItems(setOpen) {
    return (
      <nav className="mt-8 flex flex-col gap-2">
        {admoinSidebarMenuItems.map((item) => (
          <div
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen(false);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex justify-center gap-x-1 my4">
                <ChartNoAxesCombined />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            {menuItems(setOpen)}
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel </h1>
        </div>
        {menuItems()}
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
