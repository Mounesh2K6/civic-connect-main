import { useState, useRef } from "react";
import { useApp, type IssueType } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, FileText, Tag, Send, CheckCircle, Construction, Lightbulb, Trash2, Droplets, Route, Waves } from "lucide-react";
import { toast } from "sonner";

const issueTypes: { value: IssueType; icon: React.ReactNode }[] = [
  { value: "pothole", icon: <Construction size={18} /> },
  { value: "streetlight", icon: <Lightbulb size={18} /> },
  { value: "garbage", icon: <Trash2 size={18} /> },
  { value: "water", icon: <Droplets size={18} /> },
  { value: "road", icon: <Route size={18} /> },
  { value: "drainage", icon: <Waves size={18} /> },
];

const ReportIssue = () => {
  const { addIssue, t } = useApp();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<IssueType | "">("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !description || !type || !preview) {
      toast.error(t("required"));
      return;
    }
    addIssue({ image: preview, location, type, description });
    toast.success(t("successTitle"), { description: t("successMsg") });
    navigate("/");
  };

  return (
    <div className="container max-w-lg py-8">
      <h1 className="animate-fade-up text-2xl font-bold tracking-tight text-foreground mb-6">
        {t("reportIssue")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        {/* Photo upload */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Camera size={14} className="text-primary" />
            {t("uploadPhoto")}
          </label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {preview ? (
            <div
              className="relative rounded-lg overflow-hidden cursor-pointer border border-border"
              onClick={() => fileRef.current?.click()}
            >
              <img src={preview} alt="Preview" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium bg-card/90 backdrop-blur-sm px-3 py-1 rounded-md text-foreground">
                  Change photo
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Camera size={28} />
              <span className="text-sm">{t("uploadPhoto")}</span>
            </button>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <MapPin size={14} className="text-primary" />
            {t("location")}
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("locationPlaceholder")}
            className="w-full bg-muted border-0 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Issue type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Tag size={14} className="text-primary" />
            {t("issueType")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {issueTypes.map((it) => (
              <button
                key={it.value}
                type="button"
                onClick={() => setType(it.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-sm font-medium transition-all duration-200 active:scale-95 ${
                  type === it.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                {it.icon}
                <span className="text-xs">{t(it.value)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <FileText size={14} className="text-primary" />
            {t("description")}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("descriptionPlaceholder")}
            rows={3}
            className="w-full bg-muted border-0 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <Send size={16} />
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
