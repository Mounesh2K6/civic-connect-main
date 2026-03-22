import React, { createContext, useContext, useState, useCallback } from "react";
import potholeImg from "@/assets/pothole.jpg";
import streetlightImg from "@/assets/streetlight.jpg";
import garbageImg from "@/assets/garbage.jpg";
import waterLeakImg from "@/assets/water-leak.jpg";
import roadDamageImg from "@/assets/road-damage.jpg";
import drainageImg from "@/assets/drainage.jpg";

export type IssueType = "pothole" | "streetlight" | "garbage" | "water" | "road" | "drainage";
export type Lang = "en" | "te";

export interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface Issue {
  id: string;
  image: string;
  location: string;
  type: IssueType;
  description: string;
  votes: number;
  voted: boolean;
  comments: Comment[];
  time: string;
}

const translations = {
  en: {
    appName: "Local Issue Reporter",
    reportIssue: "Report Issue",
    viewIssues: "View Issues",
    location: "Location",
    description: "Description",
    issueType: "Issue Type",
    uploadPhoto: "Upload Photo",
    submit: "Submit Report",
    pothole: "Pothole",
    streetlight: "Streetlight",
    garbage: "Garbage",
    water: "Water Leakage",
    road: "Road Damage",
    drainage: "Drainage",
    upvote: "Upvote",
    comments: "Comments",
    addComment: "Add a comment...",
    post: "Post",
    votes: "votes",
    sortBy: "Sorted by priority",
    heroTitle: "Report. Track. Resolve.",
    heroSub: "Help improve your neighbourhood by reporting civic issues that matter.",
    noIssues: "No issues reported yet",
    locationPlaceholder: "e.g. MG Road, Hyderabad",
    descriptionPlaceholder: "Describe the issue briefly...",
    successTitle: "Issue Reported!",
    successMsg: "Your report has been submitted successfully.",
    required: "Please fill all fields",
  },
  te: {
    appName: "స్థానిక సమస్య రిపోర్టర్",
    reportIssue: "సమస్య నివేదించు",
    viewIssues: "సమస్యలు చూడు",
    location: "ప్రదేశం",
    description: "వివరణ",
    issueType: "సమస్య రకం",
    uploadPhoto: "ఫోటో అప్లోడ్",
    submit: "నివేదిక సమర్పించు",
    pothole: "గుంట",
    streetlight: "వీధి దీపం",
    garbage: "చెత్త",
    water: "నీటి లీకేజ్",
    road: "రోడ్డు నష్టం",
    drainage: "మురుగు",
    upvote: "ఓటు",
    comments: "వ్యాఖ్యలు",
    addComment: "వ్యాఖ్య రాయండి...",
    post: "పోస్ట్",
    votes: "ఓట్లు",
    sortBy: "ప్రాధాన్యత ప్రకారం",
    heroTitle: "నివేదించు. ట్రాక్ చేయి. పరిష్కరించు.",
    heroSub: "మీ పరిసరాలను మెరుగుపరచడంలో సహాయపడండి.",
    noIssues: "ఇంకా ఎటువంటి సమస్యలు నివేదించబడలేదు",
    locationPlaceholder: "ఉదా. ఎమ్‌జి రోడ్, హైదరాబాద్",
    descriptionPlaceholder: "సమస్యను సంక్షిప్తంగా వివరించండి...",
    successTitle: "సమస్య నివేదించబడింది!",
    successMsg: "మీ నివేదిక విజయవంతంగా సమర్పించబడింది.",
    required: "దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి",
  },
};

const sampleIssues: Issue[] = [
  {
    id: "1",
    image: potholeImg,
    location: "Ameerpet Main Road, Hyderabad",
    type: "pothole",
    description: "Large pothole causing accidents near the metro station. Multiple vehicles damaged this week.",
    votes: 42,
    voted: false,
    comments: [
      { id: "c1", author: "Rajesh K.", text: "My scooter tyre got punctured here yesterday!", time: "2 hours ago" },
      { id: "c2", author: "Priya M.", text: "GHMC should fix this urgently.", time: "1 hour ago" },
    ],
    time: "3 hours ago",
  },
  {
    id: "2",
    image: streetlightImg,
    location: "Jubilee Hills Road No. 36, Hyderabad",
    type: "streetlight",
    description: "Streetlight has been broken for over 2 weeks. The entire stretch is dark after 7 PM, very unsafe for pedestrians.",
    votes: 28,
    voted: false,
    comments: [
      { id: "c3", author: "Anitha S.", text: "Women feel unsafe walking here at night.", time: "5 hours ago" },
    ],
    time: "1 day ago",
  },
  {
    id: "3",
    image: garbageImg,
    location: "Kukatpally Housing Board Colony, Hyderabad",
    type: "garbage",
    description: "Garbage dump overflowing for the past 5 days. Foul smell spreading to nearby houses. Stray dogs everywhere.",
    votes: 67,
    voted: false,
    comments: [
      { id: "c4", author: "Suresh R.", text: "Called the municipal office 3 times, no response.", time: "4 hours ago" },
      { id: "c5", author: "Lakshmi D.", text: "Children in the colony are falling sick.", time: "2 hours ago" },
      { id: "c6", author: "Venkat P.", text: "We need daily waste collection here!", time: "30 min ago" },
    ],
    time: "5 days ago",
  },
  {
    id: "4",
    image: waterLeakImg,
    location: "Dilsukhnagar Bus Stop, Hyderabad",
    type: "water",
    description: "Water main pipe leaking continuously near the bus stop. Wasting thousands of litres daily.",
    votes: 35,
    voted: false,
    comments: [
      { id: "c7", author: "Mohammed F.", text: "The road is always wet and slippery because of this.", time: "6 hours ago" },
    ],
    time: "2 days ago",
  },
  {
    id: "5",
    image: roadDamageImg,
    location: "LB Nagar Ring Road, Hyderabad",
    type: "road",
    description: "Entire road surface cracked after recent rains. Heavy vehicles are making it worse every day.",
    votes: 53,
    voted: false,
    comments: [
      { id: "c8", author: "Ravi T.", text: "Commuting to work has become a nightmare.", time: "1 day ago" },
      { id: "c9", author: "Sravani K.", text: "Autowalas are refusing to come this route now.", time: "8 hours ago" },
    ],
    time: "4 days ago",
  },
  {
    id: "6",
    image: drainageImg,
    location: "Begumpet Railway Station Road, Hyderabad",
    type: "drainage",
    description: "Blocked drainage causing water stagnation on the street. Mosquito breeding ground, dengue risk increasing.",
    votes: 44,
    voted: false,
    comments: [
      { id: "c10", author: "Kavya N.", text: "Two dengue cases already reported in our lane.", time: "3 hours ago" },
    ],
    time: "1 week ago",
  },
];

interface AppContextType {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, "id" | "votes" | "voted" | "comments" | "time">) => void;
  toggleVote: (id: string) => void;
  addComment: (issueId: string, text: string) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dark: boolean;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType>(null!);

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(sampleIssues);
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  const t = useCallback(
    (key: string) => (translations[lang] as Record<string, string>)[key] || key,
    [lang]
  );

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const addIssue = useCallback(
    (issue: Omit<Issue, "id" | "votes" | "voted" | "comments" | "time">) => {
      setIssues((prev) => [
        {
          ...issue,
          id: Date.now().toString(),
          votes: 0,
          voted: false,
          comments: [],
          time: "Just now",
        },
        ...prev,
      ]);
    },
    []
  );

  const toggleVote = useCallback((id: string) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, voted: !i.voted, votes: i.voted ? i.votes - 1 : i.votes + 1 }
          : i
      )
    );
  }, []);

  const addComment = useCallback((issueId: string, text: string) => {
    const names = ["Arun K.", "Sneha P.", "Kiran M.", "Divya R.", "Harish S."];
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? {
              ...i,
              comments: [
                ...i.comments,
                {
                  id: Date.now().toString(),
                  author: names[Math.floor(Math.random() * names.length)],
                  text,
                  time: "Just now",
                },
              ],
            }
          : i
      )
    );
  }, []);

  return (
    <AppContext.Provider value={{ issues, addIssue, toggleVote, addComment, lang, setLang, t, dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};
