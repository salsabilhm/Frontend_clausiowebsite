// pages/AIContractGenerator.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { COLORS } from "../layouts/AuthLayout";
import {
  ChatMessage,
  ContractSection,
  ProcessingStep,
  initialAssistantMessage,
  initialProcessingSteps,
  mockContractSections,
  mockAiResponses,
  suggestedPrompts,
} from "../mock/aiContractGenerator";
import { useEditor, DocumentSection } from "../context/EditorContext";

// All icons come from "lucide-react".
// Make sure it is installed: npm install lucide-react
import {
  Upload,
  Check,
  Send,
  Copy,
  Maximize2,
  X,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Save,
  RefreshCw,
  FilePlus,
  Search,
  Filter,
  Grid,
  Folder,
  Users,
  Clock,
  Download,
  Edit3,
  Trash2,
  Star,
  Share2,
  MoreVertical,
  Menu,
  Home,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Info,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  Bell,
  Calendar,
  Tag,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  DollarSign,
  Percent,
  Award,
  Target,
  Zap,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Phone,
  MapPin,
  Globe,
  Link,
  Paperclip,
  Image,
  Video,
  Mic,
  Headphones,
  Monitor,
  Server,
  Cloud,
  Database,
  Code,
  Terminal,
  Package,
  Box,
  Truck,
  ShoppingCart,
  CreditCard,
  Briefcase,
  Clipboard,
  File,
  FileMinus,
  FolderPlus,
  FolderMinus,
  Book,
  BookOpen,
  Bookmark,
  Music,
  Film,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Minus,
  ExternalLink,
  Loader2,
} from "lucide-react";

/* ---------- Icons Map ---------- */
// Note: lucide-react does not ship brand logos or social icons like
// Github/Twitter/Youtube/Linkedin/Instagram/Facebook/WhatsApp/Discord/
// Slack/Google/Apple/etc. Those entries fall back to the closest
// generic icon already imported above.
const Icons = {
  upload: Upload,
  check: Check,
  send: Send,
  copy: Copy,
  expand: Maximize2,
  close: X,
  bot: MessageSquare,
  alert: AlertTriangle,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  file: FileText,
  save: Save,
  refresh: RefreshCw,
  plus: FilePlus,
  search: Search,
  filter: Filter,
  grid: Grid,
  folder: Folder,
  users: Users,
  clock: Clock,
  download: Download,
  edit: Edit3,
  trash: Trash2,
  star: Star,
  share: Share2,
  more: MoreVertical,
  menu: Menu,
  home: Home,
  settings: Settings,
  user: User,
  logout: LogOut,
  help: HelpCircle,
  info: Info,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  mail: Mail,
  userPlus: UserPlus,
  login: LogIn,
  bell: Bell,
  calendar: Calendar,
  tag: Tag,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  barChart: BarChart2,
  pieChart: PieChart,
  dollar: DollarSign,
  percent: Percent,
  award: Award,
  target: Target,
  zap: Zap,
  heart: Heart,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  messageCircle: MessageCircle,
  phone: Phone,
  mapPin: MapPin,
  globe: Globe,
  link: Link,
  paperclip: Paperclip,
  image: Image,
  video: Video,
  mic: Mic,
  headphones: Headphones,
  monitor: Monitor,
  server: Server,
  cloud: Cloud,
  database: Database,
  code: Code,
  terminal: Terminal,
  package: Package,
  box: Box,
  truck: Truck,
  shoppingCart: ShoppingCart,
  creditCard: CreditCard,
  briefcase: Briefcase,
  clipboard: Clipboard,
  fileIcon: File,
  filePlus: FilePlus,
  fileMinus: FileMinus,
  folderPlus: FolderPlus,
  folderMinus: FolderMinus,
  book: Book,
  bookOpen: BookOpen,
  bookmark: Bookmark,
  music: Music,
  film: Film,
  message: MessageCircle,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  minus: Minus,
  externalLink: ExternalLink,
  loader: Loader2,
  starFilled: Star,
  starOutline: Star,
  heartFilled: Heart,
  heartOutline: Heart,
  fileAlt: FileText,
  // Social/brand icons -> generic fallbacks
  github: Code,
  twitter: MessageCircle,
  youtube: Video,
  linkedin: Briefcase,
  instagram: Image,
  facebook: MessageSquare,
  google: Globe,
  apple: Globe,
  microsoft: Globe,
  amazon: ShoppingCart,
  spotify: Music,
  airbnb: Home,
  uber: Truck,
  paypal: CreditCard,
  stripe: CreditCard,
  shopify: ShoppingCart,
  salesforce: Cloud,
  whatsapp: MessageCircle,
  discord: MessageSquare,
  slack: MessageSquare,
};

/* ---------- Icon Component ---------- */
const Icon: React.FC<{
  name: keyof typeof Icons;
  className?: string;
  size?: number;
  color?: string;
  filled?: boolean; // for starFilled / heartFilled: fills the icon
}> = ({ name, className = "w-5 h-5", size, color, filled }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return null;
  }
  const isFilledVariant = name === "starFilled" || name === "heartFilled";
  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      fill={filled || isFilledVariant ? "currentColor" : "none"}
    />
  );
};

/* ---------- Types ---------- */
interface UploadFile {
  id: string;
  name: string;
  type: "audio" | "video" | "whatsapp";
  size: number;
}

/* ---------- Main Component ---------- */
const AIContractGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveContract } = useEditor();
  const [pageState, setPageState] = useState<"upload" | "processing" | "chat">("upload");

  // Upload State
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [prompt, setPrompt] = useState("");
  const [showUploadWarning, setShowUploadWarning] = useState(false);

  // Processing State
  const [steps, setSteps] = useState<ProcessingStep[]>(initialProcessingSteps);
  const [overallProgress, setOverallProgress] = useState(0);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [contractData, setContractData] = useState<ContractSection[]>([]);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset active section when contract data changes
  useEffect(() => {
    if (contractData.length > 0) {
      setActiveSectionIndex(0);
    }
  }, [contractData]);

  // Clear warning when file uploaded
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setShowUploadWarning(false);
    }
  }, [uploadedFiles.length]);

  // Handle file upload
  const handleFileUpload = (files: FileList | null, type: UploadFile["type"]) => {
    if (!files) return;
    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      type,
      size: file.size,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  // Remove file
  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const canGenerate = uploadedFiles.length > 0;

  // Handle generate contract
  const handleGenerateContract = async () => {
    if (!canGenerate) {
      setShowUploadWarning(true);
      return;
    }
    setPageState("processing");
    await simulateProcessing();
  };

  // Simulate AI processing
  const simulateProcessing = async () => {
    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) => prev.map((step, idx) => (idx === i ? { ...step, status: "processing" } : step)));

      await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

      setSteps((prev) => prev.map((step, idx) => (idx === i ? { ...step, status: "completed" } : step)));

      const progress = ((i + 1) / steps.length) * 100;
      setOverallProgress(progress);
    }

    // Use mockContractSections (no duplicates)
    setContractData(mockContractSections);
    setActiveSectionIndex(0);
    setPageState("chat");
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputMessage,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      content: mockAiResponses[Math.floor(Math.random() * mockAiResponses.length)],
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
  };

  // Navigation between sections
  const goToPreviousSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const goToNextSection = () => {
    if (activeSectionIndex < contractData.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  const goToSection = (index: number) => {
    setActiveSectionIndex(index);
  };

  // Handle save contract -- this is the bridge to DocumentEditor via
  // EditorContext. Instead of just navigating, we first turn the
  // generated ContractSection[] (id/title/content) into the richer
  // DocumentSection[] shape DocumentEditor expects (id/title/content/
  // type/align), store it as the "active contract" in EditorContext,
  // then navigate. DocumentEditor picks it up from context instead of
  // falling back to its own hardcoded INITIAL_SECTIONS.
  const handleSaveContract = () => {
    if (contractData.length === 0) return;

    const sections: DocumentSection[] = contractData.map((section, index) => ({
      id: section.id,
      title: section.title.trim(),
      content: section.content,
      type: index === 0 ? "heading1" : "heading2",
      align: "left",
    }));

    const derivedTitle = prompt.trim()
      ? `${prompt.trim().slice(0, 60)} - Project Specification`
      : "AI-Generated Project Specification";

    setActiveContract({
      title: derivedTitle,
      sections,
      // TODO: replace with settings.aiOutputLanguage once SettingsContext
      // is wired in, so the generated document respects the user's
      // chosen AI output language instead of always defaulting here.
      language: "English",
      source: "ai-generated",
      createdAt: new Date().toISOString(),
    });

    navigate("/document-editor");
  };

  // Handle reset
  const handleReset = () => {
    setPageState("upload");
    setUploadedFiles([]);
    setPrompt("");
    setShowUploadWarning(false);
    setSteps(initialProcessingSteps);
    setOverallProgress(0);
    setMessages([initialAssistantMessage]);
    setContractData([]);
    setActiveSectionIndex(0);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  const activeSection = contractData[activeSectionIndex] || null;
  const totalSections = contractData.length;

  return (
    <DashboardLayout active="ai-contract-generator">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }

        .fade-in {
          animation: fadeInUp 0.5s ease-out both;
        }
        .shake {
          animation: shakeX 0.4s ease-in-out;
        }

        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }

        .dropzone {
          border: 2px dashed #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .dropzone:hover {
          border-color: ${COLORS.primary};
          background: rgba(79,132,169,0.03);
        }
        .dropzone.drag-active {
          border-color: ${COLORS.primary};
          background: rgba(79,132,169,0.06);
          transform: scale(1.01);
        }

        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.5s ease;
        }

        .step-connector {
          width: 2px;
          height: 20px;
          margin: 4px 0;
          background: #e2e8f0;
          transition: all 0.5s ease;
        }
        .step-connector.completed {
          background: ${COLORS.primary};
        }

        .chat-message-user {
          background: ${COLORS.primary};
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
        .chat-message-assistant {
          background: #f1f5f9;
          color: #1e293b;
          border-radius: 18px 18px 18px 4px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
          display: inline-block;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        .preview-section {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .preview-section.expanded {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          padding: 24px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
        }
        .preview-section.expanded .preview-card {
          max-width: 900px;
          margin: 0 auto;
          height: 90vh;
          overflow-y: auto;
        }

        .section-tab {
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .section-tab:hover {
          transform: translateY(-1px);
        }
        .section-tab.active {
          background: ${COLORS.primary};
          color: white;
          border-color: ${COLORS.primary};
        }
        .section-tab.inactive {
          background: white;
          color: ${COLORS.text};
          border-color: #e2e8f0;
        }
        .section-tab.inactive:hover {
          background: #f8fafc;
          border-color: ${COLORS.primary}50;
        }

        .nav-btn {
          transition: all 0.2s ease;
          border: 1px solid #e2e8f0;
          background: white;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: ${COLORS.textMuted};
        }
        .nav-btn:hover:not(:disabled) {
          border-color: ${COLORS.primary};
          color: ${COLORS.primary};
          background: ${COLORS.primary}05;
        }
        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .section-counter {
          font-size: 12px;
          color: ${COLORS.textMuted};
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .section-tabs-wrapper {
            gap: 6px;
          }
          .section-tab {
            font-size: 11px;
            padding: 4px 10px;
          }
        }
      `}</style>

      {/* Page Banner */}
      <PageBanner
        badgeIcon={<Icon name="file" className="w-[14px] h-[14px]" />}
        badgeLabel="AI CONTRACT GENERATOR"
        title="AI Contract Generator"
        subtitle="Transform conversations, meetings, and client discussions into a professional project specification using AI."
        action={
          pageState === "upload" ? (
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <span style={{ color: COLORS.textMuted }}>
                <span className="font-semibold" style={{ color: COLORS.dark }}>
                  <Icon name="folder" className="w-4 h-4 inline mr-1" />
                  E-Commerce Mobile App
                </span>
                <span className="mx-2">•</span>
                <span>
                  <Icon name="user" className="w-3.5 h-3.5 inline mr-1" />
                  TechStart Inc.
                </span>
                <span className="mx-2">•</span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1"
                  style={{ background: "#fef3c7", color: "#92400e" }}
                >
                  <Icon name="clock" className="w-3 h-3" />
                  Draft
                </span>
              </span>
            </div>
          ) : null
        }
      />

      {/* Breadcrumb */}
      <div className="text-sm mb-6 flex items-center gap-2" style={{ color: "#94a3b8" }}>
        <Icon name="home" className="w-3.5 h-3.5" />
        <span>Dashboard</span>
        <Icon name="chevronRight" className="w-3 h-3" />
        <span>Projects</span>
        <Icon name="chevronRight" className="w-3 h-3" />
        <span style={{ color: COLORS.primary }} className="font-medium">
          AI Contract Generator
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* SECTION 1: UPLOAD AREA */}
        {pageState === "upload" && (
          <div className="fade-in">
            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-lg" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
              <h2 className="text-xl font-semibold mb-2 cursive-title flex items-center gap-2" style={{ color: COLORS.dark }}>
                <Icon name="upload" className="w-5 h-5" />
                Upload Your Project Sources
              </h2>
              <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
                <Icon name="info" className="w-3.5 h-3.5 inline mr-1" />
                Upload at least one source (audio, video, or WhatsApp export) so the AI has something to
                analyze. The prompt below is optional extra context.
              </p>

              {/* Supported inputs badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <Icon name="music" className="w-3.5 h-3.5" /> Audio File
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <Icon name="film" className="w-3.5 h-3.5" /> Video File
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <Icon name="message" className="w-3.5 h-3.5" /> WhatsApp Export
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5" style={{ background: "#f1f5f9", color: "#334155" }}>
                  <Icon name="file" className="w-3.5 h-3.5" /> Additional Prompt (optional)
                </span>
              </div>

              {/* Dropzone */}
              <div
                className={`dropzone rounded-xl p-8 text-center mb-4 ${showUploadWarning ? "shake" : ""}`}
                style={showUploadWarning ? { borderColor: "#F59E0B", background: "rgba(245,158,11,0.04)" } : undefined}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("drag-active");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("drag-active");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("drag-active");
                  handleFileUpload(e.dataTransfer.files, "audio");
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files, "audio")}
                  accept="audio/*,video/*,.txt,.csv,.json"
                />
                <Icon name="upload" className="w-8 h-8" />
                <p className="mt-3 font-medium" style={{ color: COLORS.dark }}>
                  Drag & drop files here
                </p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>
                  or click to browse
                </p>
              </div>

              {/* Warning */}
              {showUploadWarning && (
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4 text-sm"
                  style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
                >
                  <Icon name="alert" className="w-4 h-4" />
                  Please upload at least one audio, video, or WhatsApp file before generating the contract.
                </div>
              )}

              {/* Upload buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <button
                  className="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:border-[#4F84A9] hover:bg-[#f8fafc] flex items-center justify-center gap-2"
                  style={{ borderColor: "#e2e8f0" }}
                  onClick={() => document.getElementById("audio-input")?.click()}
                >
                  <input id="audio-input" type="file" accept="audio/*" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files, "audio")} />
                  <Icon name="music" className="w-4 h-4" /> Upload Audio
                </button>
                <button
                  className="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:border-[#4F84A9] hover:bg-[#f8fafc] flex items-center justify-center gap-2"
                  style={{ borderColor: "#e2e8f0" }}
                  onClick={() => document.getElementById("video-input")?.click()}
                >
                  <input id="video-input" type="file" accept="video/*" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files, "video")} />
                  <Icon name="film" className="w-4 h-4" /> Upload Video
                </button>
                <button
                  className="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:border-[#4F84A9] hover:bg-[#f8fafc] flex items-center justify-center gap-2"
                  style={{ borderColor: "#e2e8f0" }}
                  onClick={() => document.getElementById("whatsapp-input")?.click()}
                >
                  <input id="whatsapp-input" type="file" accept=".txt,.csv,.json" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files, "whatsapp")} />
                  <Icon name="whatsapp" className="w-4 h-4" /> Upload WhatsApp Export
                </button>
              </div>

              {/* Uploaded files list */}
              {uploadedFiles.length > 0 && (
                <div className="mb-4 p-4 rounded-xl" style={{ background: "#f8fafc" }}>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: COLORS.dark }}>
                    <Icon name="file" className="w-4 h-4" />
                    Uploaded Files ({uploadedFiles.length})
                  </p>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {file.type === "audio" && <Icon name="music" className="w-4 h-4" />}
                            {file.type === "video" && <Icon name="film" className="w-4 h-4" />}
                            {file.type === "whatsapp" && <Icon name="whatsapp" className="w-4 h-4" />}
                          </span>
                          <span className="text-sm" style={{ color: COLORS.dark }}>
                            {file.name}
                          </span>
                          <span className="text-xs" style={{ color: COLORS.textMuted }}>
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        <button onClick={() => removeFile(file.id)} className="text-sm hover:text-red-500 transition-colors" style={{ color: COLORS.textMuted }}>
                          <Icon name="close" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt textarea */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2" style={{ color: COLORS.dark }}>
                  <Icon name="edit" className="w-4 h-4" />
                  Additional Prompt (optional)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe additional requirements, technical details, preferred technologies, business goals, deadlines..."
                  rows={4}
                  className="w-full rounded-xl border p-4 text-sm resize-none focus:outline-none transition-all"
                  style={{ borderColor: "#e2e8f0", background: "white" }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerateContract}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                style={{
                  background: canGenerate ? `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})` : "#cbd5e1",
                  boxShadow: canGenerate ? `0 4px 20px ${COLORS.primary}30` : "none",
                  cursor: canGenerate ? "pointer" : "not-allowed",
                }}
              >
                <Icon name="zap" className="w-5 h-5" />
                Generate Contract
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: PROCESSING */}
        {pageState === "processing" && (
          <div className="fade-in">
            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-lg" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" style={{ background: `${COLORS.primary}15` }}>
                  <Icon name="file" className="w-[14px] h-[14px]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold cursive-title flex items-center gap-2" style={{ color: COLORS.dark }}>
                    <Icon name="loader" className="w-4 h-4 animate-spin" />
                    Processing Your Project...
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.textMuted }}>
                    {Math.round(overallProgress)}% Complete
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full mb-6 overflow-hidden" style={{ background: "#f1f5f9" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${overallProgress}%`,
                    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.coral})`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const isCompleted = step.status === "completed";
                  const isProcessing = step.status === "processing";
                  const isPending = step.status === "pending";

                  return (
                    <div key={step.id}>
                      <div
                        className="flex items-center gap-4 p-3 rounded-xl transition-all"
                        style={{ background: isProcessing ? `${COLORS.primary}08` : "transparent" }}
                      >
                        <div
                          className="step-circle"
                          style={{
                            background: isCompleted ? "#dcfce7" : isProcessing ? `${COLORS.primary}15` : "#f1f5f9",
                            border: isProcessing ? `2px solid ${COLORS.primary}` : "none",
                          }}
                        >
                          {isCompleted && <Icon name="check" className="w-[18px] h-[18px]" />}
                          {isProcessing && (
                            <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: COLORS.primary, borderTopColor: "transparent" }} />
                          )}
                          {isPending && <div className="w-2 h-2 rounded-full" style={{ background: "#cbd5e1" }} />}
                        </div>
                        <span
                          className="flex-1 text-sm"
                          style={{
                            color: isCompleted ? "#166534" : isProcessing ? COLORS.primary : "#94a3b8",
                            fontWeight: isProcessing ? "500" : "400",
                          }}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                          {isCompleted && <><Icon name="check" className="w-3 h-3" /> Done</>}
                          {isProcessing && <><Icon name="loader" className="w-3 h-3 animate-spin" /> Processing...</>}
                          {isPending && <><Icon name="clock" className="w-3 h-3" /> Pending</>}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`step-connector ml-6 ${isCompleted ? "completed" : ""}`} style={{ marginLeft: "38px" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3 & 4: CHAT + PREVIEW */}
        {pageState === "chat" && (
          <div className="grid lg:grid-cols-2 gap-6 fade-in">
            {/* Chat Section */}
            <div className="space-y-4">
              <div className="bg-white rounded-[20px] shadow-lg overflow-hidden flex flex-col" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)", height: "500px" }}>
                {/* Chat header */}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${COLORS.primary}15` }}>
                      <Icon name="bot" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2" style={{ color: COLORS.dark }}>
                        AI Assistant
                        <span className="text-xs font-normal flex items-center gap-1" style={{ color: "#22c55e" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                          Online
                        </span>
                      </p>
                    </div>
                  </div>
                  <button className="text-xs hover:opacity-70 transition-opacity" style={{ color: COLORS.textMuted }}>
                    <Icon name="more" className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 text-sm ${msg.role === "user" ? "chat-message-user" : "chat-message-assistant"}`}>
                        {msg.role === "assistant" && (
                          <span className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: COLORS.textMuted }}>
                            <Icon name="bot" className="w-3 h-3" /> Assistant
                          </span>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2.5 chat-message-assistant flex gap-1">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat input */}
                <div className="p-4 border-t" style={{ borderColor: "#f1f5f9" }}>
                  <div className="flex gap-2">
                    <input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask the AI to modify your specification..."
                      className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                      style={{ borderColor: "#e2e8f0" }}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="px-4 py-2.5 rounded-xl text-white transition-all disabled:opacity-50 flex items-center justify-center"
                      style={{ background: inputMessage.trim() ? COLORS.primary : "#cbd5e1" }}
                    >
                      <Icon name="send" className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {suggestedPrompts.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputMessage(suggestion);
                          setTimeout(handleSendMessage, 100);
                        }}
                        className="px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105 flex items-center gap-1"
                        style={{ background: "#f1f5f9", color: COLORS.primary }}
                      >
                        <Icon name="plus" className="w-3 h-3" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Preview */}
            <div>
              <div className="bg-white rounded-[20px] shadow-lg overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
                {/* Preview header */}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
                  <div className="flex items-center gap-2">
                    <Icon name="file" className="w-4 h-4" />
                    <span className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                      Contract Preview
                    </span>
                    <span className="section-counter">
                      {totalSections > 0 ? `${activeSectionIndex + 1} / ${totalSections}` : "0 / 0"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(contractData.map((s) => `${s.title}\n${s.content}`).join("\n\n"))}
                      className="p-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors"
                      style={{ color: COLORS.textMuted }}
                    >
                      <Icon name="copy" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                      className="p-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors"
                      style={{ color: COLORS.textMuted }}
                    >
                      <Icon name="expand" className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Navigation buttons - Previous / Next */}
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <button
                    onClick={goToPreviousSection}
                    disabled={activeSectionIndex === 0}
                    className="nav-btn"
                  >
                    <Icon name="chevronLeft" className="w-4 h-4" /> Previous
                  </button>
                  <span className="text-xs font-medium flex items-center gap-1" style={{ color: COLORS.textMuted }}>
                    <Icon name="file" className="w-3 h-3" />
                    {activeSection ? activeSection.title : "No section"}
                  </span>
                  <button
                    onClick={goToNextSection}
                    disabled={activeSectionIndex >= totalSections - 1}
                    className="nav-btn"
                  >
                    Next <Icon name="chevronRight" className="w-4 h-4" />
                  </button>
                </div>

                {/* Section tabs - no duplicates */}
                <div className="flex gap-2 px-4 py-3 border-b overflow-x-auto section-tabs-wrapper" style={{ borderColor: "#f1f5f9" }}>
                  {contractData.map((section, index) => {
                    const isActive = index === activeSectionIndex;
                    return (
                      <button
                        key={section.id}
                        onClick={() => goToSection(index)}
                        className={`section-tab rounded-full px-3.5 py-2 text-xs font-medium border flex items-center gap-1 ${
                          isActive ? "active" : "inactive"
                        }`}
                      >
                        {isActive && <Icon name="check" className="w-3 h-3" />}
                        {section.title}
                      </button>
                    );
                  })}
                </div>

                {/* Preview content - shows ONLY the active section */}
                <div className={`preview-section ${isPreviewExpanded ? "expanded" : ""}`}>
                  <div className="preview-card p-6 max-h-[400px] overflow-y-auto">
                    {activeSection ? (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: COLORS.dark }}>
                          <Icon name="file" className="w-4 h-4" />
                          {activeSection.title}
                        </h4>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: "#475569", lineHeight: "1.6" }}>
                          {activeSection.content}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm flex items-center gap-2" style={{ color: COLORS.textMuted }}>
                        <Icon name="info" className="w-4 h-4" />
                        Select a section above to preview it.
                      </p>
                    )}
                    {isPreviewExpanded && (
                      <button
                        onClick={() => setIsPreviewExpanded(false)}
                        className="fixed top-6 right-6 p-2 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
                      >
                        <Icon name="close" className="w-[18px] h-[18px]" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer - Save button */}
                <div className="px-6 py-4 border-t" style={{ borderColor: "#f1f5f9" }}>
                  <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: COLORS.textMuted }}>
                    <Icon name="info" className="w-3.5 h-3.5" />
                    Save this AI-generated specification and continue editing it inside the professional document editor.
                  </p>
                  <button
                    onClick={handleSaveContract}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
                      boxShadow: `0 4px 20px ${COLORS.primary}30`,
                    }}
                  >
                    <Icon name="save" className="w-4 h-4" /> Save Contract
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full mt-2 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[#f1f5f9] flex items-center justify-center gap-2"
                    style={{ color: COLORS.textMuted }}
                  >
                    <Icon name="refresh" className="w-4 h-4" /> Start New Contract
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIContractGenerator;
