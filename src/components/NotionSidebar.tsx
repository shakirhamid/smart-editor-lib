import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Home,
  Inbox,
  Search,
  Settings,
  Plus,
  MoreHorizontal,
  Star,
  Clock,
  Trash2,
  Calendar,
} from "lucide-react";

interface PageItem {
  id: string;
  title: string;
  icon?: string;
  children?: PageItem[];
}

const samplePages: PageItem[] = [
  { id: "1", title: "Getting Started", icon: "🚀" },
  { id: "2", title: "Project Notes", icon: "📝" },
  {
    id: "3",
    title: "Team Wiki",
    icon: "📚",
    children: [
      { id: "3-1", title: "Onboarding", icon: "👋" },
      { id: "3-2", title: "Guidelines", icon: "📋" },
    ],
  },
  { id: "4", title: "Meeting Notes", icon: "🗓️" },
  { id: "5", title: "Ideas", icon: "💡" },
];

interface SidebarItemProps {
  page: PageItem;
  level?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarPageItem = ({ page, level = 0, isActive, onClick }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = page.children && page.children.length > 0;

  return (
    <div>
      <div
        className={`group sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
        style={{ paddingLeft: `${8 + level * 12}px` }}
        onClick={onClick}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="p-0.5 hover:bg-accent rounded"
          >
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <span className="text-sm">{page.icon || "📄"}</span>
        <span className="flex-1 truncate text-sm">{page.title}</span>
        <div className="hover-actions flex items-center gap-0.5">
          <button className="p-1 hover:bg-accent rounded">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-accent rounded">
            <Plus className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
      {hasChildren && isOpen && (
        <div className="animate-fade-in">
          {page.children?.map((child) => (
            <SidebarPageItem key={child.id} page={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface NotionSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  currentView?: "page" | "calendar";
  onViewChange?: (view: "page" | "calendar") => void;
}

export const NotionSidebar = ({ 
  isCollapsed = false, 
  onToggle,
  currentView = "page",
  onViewChange,
}: NotionSidebarProps) => {
  const [activePage, setActivePage] = useState("1");

  if (isCollapsed) {
    return (
      <div className="w-12 h-screen bg-sidebar border-r border-sidebar-border flex flex-col items-center py-3 gap-2">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
        </button>
        <div className="flex-1" />
        <button className="p-2 hover:bg-sidebar-accent rounded-md transition-colors">
          <Settings className="h-4 w-4 text-sidebar-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Workspace Header */}
      <div className="p-3 flex items-center justify-between">
        <button className="flex items-center gap-2 px-2 py-1 hover:bg-sidebar-accent rounded-md transition-colors flex-1">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-[10px] text-white font-semibold">
            W
          </div>
          <span className="text-sm font-medium text-sidebar-foreground truncate">
            Workspace
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
        </button>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-sidebar-foreground rotate-180" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-2 space-y-0.5">
        <button className="sidebar-item w-full">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span>Search</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
        </button>
        <button className="sidebar-item w-full">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Home</span>
        </button>
        <button className="sidebar-item w-full">
          <Inbox className="h-4 w-4 text-muted-foreground" />
          <span>Inbox</span>
        </button>
        <button 
          className={`sidebar-item w-full ${currentView === "calendar" ? "sidebar-item-active" : ""}`}
          onClick={() => onViewChange?.("calendar")}
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Calendar</span>
        </button>
      </div>

      {/* Favorites Section */}
      <div className="mt-4 px-2">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground">
          <Star className="h-3 w-3" />
          <span className="font-medium uppercase tracking-wide">Favorites</span>
        </div>
        <SidebarPageItem
          page={{ id: "fav-1", title: "Quick Notes", icon: "⭐" }}
          isActive={activePage === "fav-1"}
          onClick={() => setActivePage("fav-1")}
        />
      </div>

      {/* Private Section */}
      <div className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Private
          </span>
          <button className="p-0.5 hover:bg-sidebar-accent rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
        {samplePages.map((page) => (
          <SidebarPageItem
            key={page.id}
            page={page}
            isActive={activePage === page.id}
            onClick={() => setActivePage(page.id)}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        <button className="sidebar-item w-full">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Recently viewed</span>
        </button>
        <button className="sidebar-item w-full">
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <span>Trash</span>
        </button>
        <button className="sidebar-item w-full">
          <Plus className="h-4 w-4 text-muted-foreground" />
          <span>New page</span>
        </button>
      </div>
    </div>
  );
};
