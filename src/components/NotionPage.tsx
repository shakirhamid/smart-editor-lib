import { useState } from "react";
import {
  MoreHorizontal,
  MessageSquare,
  Clock,
  Star,
  Share,
  GripVertical,
  Plus,
} from "lucide-react";

interface Block {
  id: string;
  type: "heading1" | "heading2" | "heading3" | "text" | "bullet" | "todo" | "divider";
  content: string;
  checked?: boolean;
}

const initialBlocks: Block[] = [
  { id: "1", type: "text", content: "Welcome to your workspace. This is a Notion-inspired interface where you can organize your thoughts, projects, and ideas." },
  { id: "2", type: "heading2", content: "Getting Started" },
  { id: "3", type: "text", content: "Click anywhere to start typing. Use the sidebar to navigate between pages and organize your content." },
  { id: "4", type: "bullet", content: "Create nested pages for better organization" },
  { id: "5", type: "bullet", content: "Use headings to structure your content" },
  { id: "6", type: "bullet", content: "Add checkboxes for task management" },
  { id: "7", type: "divider", content: "" },
  { id: "8", type: "heading2", content: "Today's Tasks" },
  { id: "9", type: "todo", content: "Review project requirements", checked: true },
  { id: "10", type: "todo", content: "Update documentation", checked: false },
  { id: "11", type: "todo", content: "Schedule team meeting", checked: false },
  { id: "12", type: "divider", content: "" },
  { id: "13", type: "heading3", content: "Notes" },
  { id: "14", type: "text", content: "This minimal interface focuses on what matters most—your content. No distractions, just clean productivity." },
];

interface BlockComponentProps {
  block: Block;
  onUpdate: (content: string) => void;
  onToggle?: () => void;
}

const BlockComponent = ({ block, onUpdate, onToggle }: BlockComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderContent = () => {
    switch (block.type) {
      case "heading1":
        return (
          <h1
            className="notion-heading-1 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
          >
            {block.content}
          </h1>
        );
      case "heading2":
        return (
          <h2
            className="notion-heading-2 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
          >
            {block.content}
          </h2>
        );
      case "heading3":
        return (
          <h3
            className="notion-heading-3 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
          >
            {block.content}
          </h3>
        );
      case "bullet":
        return (
          <div className="flex items-start gap-2 py-0.5">
            <span className="text-muted-foreground mt-1.5">•</span>
            <p
              className="notion-text flex-1 outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            >
              {block.content}
            </p>
          </div>
        );
      case "todo":
        return (
          <div className="flex items-start gap-2 py-0.5">
            <button
              onClick={onToggle}
              className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                block.checked
                  ? "bg-notion-blue border-notion-blue"
                  : "border-muted-foreground/40 hover:border-muted-foreground"
              }`}
            >
              {block.checked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <p
              className={`notion-text flex-1 outline-none ${
                block.checked ? "line-through text-muted-foreground" : ""
              }`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            >
              {block.content}
            </p>
          </div>
        );
      case "divider":
        return <hr className="my-4 border-border" />;
      default:
        return (
          <p
            className="notion-text py-0.5 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
          >
            {block.content}
          </p>
        );
    }
  };

  return (
    <div
      className="group relative flex items-start gap-1 -ml-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center gap-0.5 pt-0.5 transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button className="p-1 hover:bg-accent rounded">
          <Plus className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        <button className="p-1 hover:bg-accent rounded cursor-grab">
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
      <div className="flex-1 notion-block">{renderContent()}</div>
    </div>
  );
};

export const NotionPage = () => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [title, setTitle] = useState("Welcome");
  const [isFavorite, setIsFavorite] = useState(false);

  const updateBlock = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const toggleTodo = (id: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, checked: !block.checked } : block
      )
    );
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🚀</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <Share className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Star
                className={`h-4 w-4 ${
                  isFavorite ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                }`}
              />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-16 py-12 animate-fade-in">
        {/* Page Icon & Title */}
        <div className="mb-8">
          <button className="text-7xl mb-4 hover:bg-accent p-2 -ml-2 rounded-lg transition-colors">
            🚀
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="notion-title w-full bg-transparent border-none focus:outline-none"
            placeholder="Untitled"
          />
        </div>

        {/* Blocks */}
        <div className="pl-10 space-y-1">
          {blocks.map((block) => (
            <BlockComponent
              key={block.id}
              block={block}
              onUpdate={(content) => updateBlock(block.id, content)}
              onToggle={() => toggleTodo(block.id)}
            />
          ))}
          
          {/* Add Block Placeholder */}
          <div className="group flex items-center gap-2 py-2 -ml-10 text-muted-foreground/50 hover:text-muted-foreground cursor-text transition-colors">
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
              <button className="p-1 hover:bg-accent rounded">
                <Plus className="h-3.5 w-3.5" />
              </button>
              <div className="w-5" />
            </div>
            <span className="text-sm">Type '/' for commands...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
