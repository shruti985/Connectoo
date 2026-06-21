import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code,
  BookOpen,
  ExternalLink,
  Trophy,
  Star,
  Zap,
  GitBranch,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart2,
  Youtube,
  Globe,
} from "lucide-react";

// --- Types ---
interface DSATopic {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  problems: number;
  subtopics: string[];
  gradient: string;
}

interface CodingResource {
  title: string;
  type: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  link?: string;
  tag?: string;
  tagColor?: string;
}

interface ChecklistItem {
  topic: string;
  done: boolean;
}


const codingResources: CodingResource[] = [
  {
    title: "LeetCode",
    type: "Practice Platform",
    description: "Industry standard for interview prep. Focus on Top 150 problems.",
    icon: Code,
    gradient: "from-yellow-500 to-orange-500",
    link: "https://leetcode.com",
    tag: "Must Do",
    tagColor: "bg-yellow-500/20 text-yellow-400",
  },
  {
    title: "Striver's SDE Sheet",
    type: "Study Plan",
    description: "400+ handpicked problems — the gold standard for placement prep in India.",
    icon: Star,
    gradient: "from-purple-500 to-pink-600",
    link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems",
    tag: "India Favorite",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "NeetCode.io",
    type: "Visual Learning",
    description: "Roadmap + video explanations for every major DSA topic.",
    icon: Youtube,
    gradient: "from-red-500 to-rose-600",
    link: "https://neetcode.io",
    tag: "Free",
    tagColor: "bg-green-500/20 text-green-400",
  },
  {
    title: "GeeksForGeeks",
    type: "Articles & Problems",
    description: "Comprehensive articles, company-wise problems, and interview experiences.",
    icon: Globe,
    gradient: "from-green-500 to-teal-600",
    link: "https://geeksforgeeks.org",
    tag: "Free",
    tagColor: "bg-green-500/20 text-green-400",
  },
  {
    title: "Codeforces",
    type: "Competitive Programming",
    description: "Level up with rated contests. Great for improving problem-solving speed.",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-600",
    link: "https://codeforces.com",
    tag: "CP",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "GitHub Repos",
    type: "Community Resources",
    description: "Curated repos: interview-questions, system-design-primer, awesome-algorithms.",
    icon: GitBranch,
    gradient: "from-gray-500 to-slate-600",
    link: "https://github.com",
    tag: "Open Source",
    tagColor: "bg-gray-500/20 text-gray-400",
  },
];

const placementChecklist: ChecklistItem[] = [
  { topic: "Complete Arrays & Strings (45 problems)", done: false },
  { topic: "Learn Time & Space Complexity", done: false },
  { topic: "Solve 20 Linked List problems", done: false },
  { topic: "Master BFS & DFS patterns", done: false },
  { topic: "Do 15 DP problems (start easy)", done: false },
  { topic: "Attempt 2 LeetCode contests", done: false },
  { topic: "Read 5 company interview experiences", done: false },
  { topic: "Practice mock interview (with buddy)", done: false },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Hard: "bg-red-500/20 text-red-400",
};

// --- Main Component ---
const CodingResources = () => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(placementChecklist.length).fill(false));

  const toggleCheck = (i: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const completedCount = checklist.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-8">

      {/* Resources Grid */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-400" /> Top Coding Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {codingResources.map((res, i) => {
            const RIcon = res.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${res.gradient} flex items-center justify-center shrink-0`}>
                    <RIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-sm">{res.title}</p>
                      {res.tag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${res.tagColor}`}>
                          {res.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{res.type}</p>
                    <p className="text-xs text-foreground/70">{res.description}</p>
                  </div>
                  {res.link && (
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CodingResources;