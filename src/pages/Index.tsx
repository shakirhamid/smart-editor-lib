import { useState } from "react";
import { NotionSidebar } from "@/components/NotionSidebar";
import { NotionPage } from "@/components/NotionPage";
import { NotionCalendar } from "@/components/NotionCalendar";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<"page" | "calendar">("page");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <NotionSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {currentView === "page" ? <NotionPage /> : <NotionCalendar />}
    </div>
  );
};

export default Index;
