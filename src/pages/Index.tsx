import { useState } from "react";
import { NotionSidebar } from "@/components/NotionSidebar";
import { NotionPage } from "@/components/NotionPage";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <NotionSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <NotionPage />
    </div>
  );
};

export default Index;
