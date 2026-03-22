import { useState } from "react";
import { useApp, type Issue, type IssueType } from "@/context/AppContext";
import { ThumbsUp, MessageCircle, MapPin, Send, ChevronDown, ChevronUp } from "lucide-react";
import IssueTypeBadge from "./IssueTypeBadge";

interface Props {
  issue: Issue;
  index: number;
}

const IssueCard = ({ issue, index }: Props) => {
  const { toggleVote, addComment, t } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(issue.id, commentText.trim());
    setCommentText("");
  };

  return (
    <article
      className="animate-fade-up bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={issue.image}
          alt={issue.description}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <IssueTypeBadge type={issue.type} />
        </div>
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md text-muted-foreground">
          {issue.time}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>{issue.location}</span>
        </div>

        <p className="text-sm text-foreground leading-relaxed">{issue.description}</p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => toggleVote(issue.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 ${
              issue.voted
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <ThumbsUp size={14} />
            <span>{issue.votes}</span>
            <span className="hidden sm:inline">{t("votes")}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-secondary transition-colors active:scale-95"
          >
            <MessageCircle size={14} />
            <span>{issue.comments.length}</span>
            {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {showComments && (
          <div className="animate-scale-in space-y-3 pt-2 border-t border-border">
            {issue.comments.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {issue.comments.map((c) => (
                  <div key={c.id} className="bg-muted rounded-lg p-2.5 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-foreground">{c.author}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder={t("addComment")}
                className="flex-1 bg-muted border-0 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity active:scale-95"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default IssueCard;
