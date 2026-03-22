import { useApp } from "@/context/AppContext";
import { Moon, Sun, Globe, AlertTriangle, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { t, lang, setLang, dark, toggleDark } = useApp();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-14 md:h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
          <AlertTriangle className="text-primary" size={22} />
          <span className="hidden sm:inline">{t("appName")}</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/report"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              location.pathname === "/report"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t("reportIssue")}
          </Link>
          <Link
            to="/"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 ${
              location.pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <List size={14} />
            <span className="hidden sm:inline">{t("viewIssues")}</span>
          </Link>

          <div className="w-px h-6 bg-border mx-1" />

          <button
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            title="Switch language"
          >
            <Globe size={14} />
            {lang === "en" ? "తెలుగు" : "ENG"}
          </button>

          <button
            onClick={toggleDark}
            className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            title="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
