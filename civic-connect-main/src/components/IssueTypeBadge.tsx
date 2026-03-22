import { useApp, type IssueType } from "@/context/AppContext";
import { Construction, Lightbulb, Trash2, Droplets, Route, Waves } from "lucide-react";

const iconMap: Record<IssueType, React.ReactNode> = {
  pothole: <Construction size={12} />,
  streetlight: <Lightbulb size={12} />,
  garbage: <Trash2 size={12} />,
  water: <Droplets size={12} />,
  road: <Route size={12} />,
  drainage: <Waves size={12} />,
};

const colorMap: Record<IssueType, string> = {
  pothole: "bg-issue-pothole",
  streetlight: "bg-issue-streetlight",
  garbage: "bg-issue-garbage",
  water: "bg-issue-water",
  road: "bg-issue-road",
  drainage: "bg-issue-drainage",
};

const IssueTypeBadge = ({ type }: { type: IssueType }) => {
  const { t } = useApp();

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold text-primary-foreground ${colorMap[type]}`}
    >
      {iconMap[type]}
      {t(type)}
    </span>
  );
};

export default IssueTypeBadge;
