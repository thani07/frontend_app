import { Image as ImageIcon, Video } from "lucide-react";

interface MediaPlaceholderProps {
  type?: "image" | "video";
  label?: string;
  className?: string;
}

const MediaPlaceholder = ({ type = "image", label, className = "" }: MediaPlaceholderProps) => {
  const Icon = type === "video" ? Video : ImageIcon;
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-muted text-muted-foreground ${className}`}
    >
      <Icon size={32} className="opacity-60" />
      <span className="font-body text-xs opacity-70">{label ?? `${type} placeholder`}</span>
    </div>
  );
};

export default MediaPlaceholder;
