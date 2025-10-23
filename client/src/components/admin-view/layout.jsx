import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex max-h-screen w-full">
      {/* Admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader onOpenChange={setOpenSidebar}/>
        <main className="flex-1 flex h-screen bg-gray-200 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
