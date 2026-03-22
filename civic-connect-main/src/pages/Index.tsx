import { useApp } from "@/context/AppContext";
import IssueCard from "@/components/IssueCard";
import { Link } from "react-router-dom";
import { Plus, TrendingUp } from "lucide-react";

const Index = () => {
  const { issues, t } = useApp();

  const sorted = [...issues].sort((a, b) => b.votes - a.votes);

  return (
    <div className="container py-8 space-y-8">
      {/* Hero */}
      <section className="animate-fade-up text-center space-y-4 py-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.1" }}>
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto" style={{ textWrap: "balance" as any }}>
          {t("heroSub")}
        </p>
        <Link
          to="/report"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <Plus size={16} />
          {t("reportIssue")}
        </Link>
      </section>

      {/* Sort indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
        <TrendingUp size={14} className="text-primary" />
        <span>{t("sortBy")}</span>
        <span className="ml-auto text-xs">{sorted.length} issues</span>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((issue, i) => (
          <IssueCard key={issue.id} issue={issue} index={i} />
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-muted-foreground py-16">{t("noIssues")}</p>
      )}
    </div>
  );
};

export default Index;
