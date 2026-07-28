// pages/DocumentEditor.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { COLORS } from "../layouts/AuthLayout";

/* ---------- Icons ---------- */

// Dedicated icon for this page (document + pen), more descriptive
// than the plain pencil previously used for "Document Editor".
const IconDocEditor = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 3v6h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17l1.5-1.5L14 12l2 2-3.5 3.5L11 19l-2-2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUndo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 7v6h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRedo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 7v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBold = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconItalic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 4h-7M10 20h7M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUnderline = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStrikethrough = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 16c0 2.2 2.7 4 6 4s6-1.8 6-4c0-2.2-2.7-4-6-4s-6 1.8-6 4zM18 8c0-2.2-2.7-4-6-4S6 5.8 6 8M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAlignLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18M3 10h14M3 14h18M3 18h14" strokeLinecap="round" />
  </svg>
);

const IconAlignCenter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18M6 10h12M3 14h18M6 18h12" strokeLinecap="round" />
  </svg>
);

const IconAlignRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18M10 10h14M3 14h18M10 18h14" strokeLinecap="round" />
  </svg>
);

const IconAlignJustify = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18M3 10h18M3 14h18M3 18h18" strokeLinecap="round" />
  </svg>
);

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconListOrdered = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChecklist = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
    <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2 2 2 0 00-2-2h-2a2 2 0 00-2 2zM9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTable = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeLinecap="round" />
  </svg>
);

const IconImage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 6L3 11l5 5M16 6l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconQuote = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M10 11h-4a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.5 4-3 4M18 11h-4a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.5 4-3 4" strokeLinecap="round" />
  </svg>
);

const IconDivider = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12h18" strokeLinecap="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const IconFullscreen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" strokeLinecap="round" />
  </svg>
);

const IconMinimize = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 3v4a2 2 0 01-2 2H3M21 9h-4a2 2 0 01-2-2V3M3 15h4a2 2 0 012 2v4M15 21v-4a2 2 0 012-2h4" strokeLinecap="round" />
  </svg>
);

const IconSave = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 21v-8H7v8M7 3v5h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPDF = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6M12 18v-4M12 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2M8 18v-4M16 18v-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWord = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6M7 15l2-6 2 6M13 15l-1-3M15 15l2-6 2 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMarkdown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 7l4 10 4-10M7 12l-2.5 4M17 7l4 10 4-10M21 12l-2.5 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round" />
  </svg>
);

const IconDuplicate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Types ---------- */
type SectionAlign = "left" | "center" | "right" | "justify";

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "list" | "checklist";
  align: SectionAlign;
}

/* ---------- Initial mock content (data, initialized only once) ---------- */
const INITIAL_TITLE = "E-Commerce Mobile App - Project Specification";

const INITIAL_SECTIONS: DocumentSection[] = [
  {
    id: "1",
    title: "Project Overview",
    content:
      "This project involves the development of a comprehensive e-commerce mobile application for TechStart Inc. The application will provide a seamless shopping experience with advanced features including user authentication, product catalog, shopping cart, payment integration, and order management.",
    type: "heading1",
    align: "left",
  },
  {
    id: "2",
    title: "Objectives",
    content:
      "1. Create a user-friendly mobile shopping experience\n2. Implement secure payment processing\n3. Enable real-time inventory management\n4. Provide personalized product recommendations\n5. Ensure scalability for future growth",
    type: "heading2",
    align: "left",
  },
  {
    id: "3",
    title: "Project Scope",
    content:
      "The project scope includes the development of both iOS and Android applications, a robust backend API, admin dashboard for content management, and integration with third-party services including payment gateways and shipping providers.",
    type: "heading2",
    align: "left",
  },
  {
    id: "4",
    title: "Business Requirements",
    content:
      "- Target market: E-commerce businesses with 100+ daily orders\n- Revenue model: Subscription-based with transaction fees\n- User acquisition: Digital marketing and partnerships\n- Key metrics: Daily active users, conversion rate, average order value",
    type: "heading2",
    align: "left",
  },
  {
    id: "5",
    title: "Functional Requirements",
    content:
      "- User registration and authentication\n- Product browsing and search\n- Shopping cart and wishlist\n- Secure checkout process\n- Order tracking\n- Push notifications\n- User reviews and ratings\n- Social media integration",
    type: "heading2",
    align: "left",
  },
  {
    id: "6",
    title: "Technical Requirements",
    content:
      "- React Native for mobile development\n- Node.js backend with Express\n- PostgreSQL database\n- Redis for caching\n- AWS cloud infrastructure\n- Stripe payment integration\n- Firebase for push notifications",
    type: "heading2",
    align: "left",
  },
  {
    id: "7",
    title: "Timeline",
    content:
      "Phase 1: Planning & Design (2 weeks)\nPhase 2: Core Development (6 weeks)\nPhase 3: Testing & QA (2 weeks)\nPhase 4: Deployment & Launch (1 week)\nTotal: 11 weeks",
    type: "heading2",
    align: "left",
  },
  {
    id: "8",
    title: "Budget",
    content:
      "Development: $45,000 - $55,000\nDesign: $10,000 - $15,000\nProject Management: $8,000 - $12,000\nTesting & QA: $5,000 - $8,000\nTotal Estimated Budget: $68,000 - $90,000",
    type: "heading2",
    align: "left",
  },
  {
    id: "9",
    title: "Deliverables",
    content:
      "1. Complete source code\n2. Technical documentation\n3. User manual\n4. API documentation\n5. Database schema\n6. Deployment scripts\n7. Testing reports\n8. Training materials",
    type: "heading2",
    align: "left",
  },
  {
    id: "10",
    title: "Risks",
    content:
      "- Technical complexity of real-time inventory sync\n- Third-party API dependencies\n- User adoption rate uncertainty\n- Security and data privacy compliance\n- Timeline pressure during peak seasons",
    type: "heading2",
    align: "left",
  },
  {
    id: "11",
    title: "Acceptance Criteria",
    content:
      "- App successfully launched on App Store and Play Store\n- 99.9% uptime during first month\n- Average load time under 2 seconds\n- 4.5+ star rating after 1000 reviews\n- 30% conversion rate on product pages\n- Secure payment processing with PCI compliance",
    type: "heading2",
    align: "left",
  },
];

/* ---------- Main Component ---------- */
const DocumentEditor: React.FC = () => {
  const navigate = useNavigate();
  const [documentTitle, setDocumentTitle] = useState(INITIAL_TITLE);
  const [sections, setSections] = useState<DocumentSection[]>(INITIAL_SECTIONS);

  // History for Undo / Redo -- successive snapshots of `sections`
  const [history, setHistory] = useState<DocumentSection[][]>([INITIAL_SECTIONS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [editingTitle, setEditingTitle] = useState(false);

  // Currently focused section (to know which textarea to apply bold/italic/align... to)
  const [focusedSectionId, setFocusedSectionId] = useState<string | null>(sections[0]?.id ?? null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const documentRef = useRef<HTMLDivElement>(null);
  const sectionContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  // Update word count
  useEffect(() => {
    const text = sections.map((s) => s.content).join(" ");
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [sections]);

  // Simulate auto-save
  useEffect(() => {
    if (saveStatus === "unsaved") {
      const timer = setTimeout(() => {
        setSaveStatus("saving");
        setTimeout(() => {
          setSaveStatus("saved");
        }, 1500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Every mutation of `sections` goes through here -> also feeds undo/redo history
  const commitSections = (newSections: DocumentSection[]) => {
    setSections(newSections);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newSections]);
    setHistoryIndex((idx) => idx + 1);
    setSaveStatus("unsaved");
  };

  // Handle content change for a section
  const handleContentChange = (id: string, newContent: string) => {
    commitSections(sections.map((s) => (s.id === id ? { ...s, content: newContent } : s)));
  };

  // Handle title change for a section
  const handleTitleChange = (id: string, newTitle: string) => {
    commitSections(sections.map((s) => (s.id === id ? { ...s, title: newTitle } : s)));
  };

  // Handle document save
  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
    }, 1500);
  };

  /* ---------- Undo / Redo ---------- */
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setSections(history[newIndex]);
    setHistoryIndex(newIndex);
    setSaveStatus("unsaved");
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setSections(history[newIndex]);
    setHistoryIndex(newIndex);
    setSaveStatus("unsaved");
  };

  /* ---------- Helpers to act on the currently focused section ---------- */
  const getFocusedSection = (): DocumentSection | null => {
    if (!focusedSectionId) return null;
    return sections.find((s) => s.id === focusedSectionId) ?? null;
  };

  // Wrap the selected text with markers (lightweight Markdown style)
  const wrapSelection = (before: string, after: string) => {
    const section = getFocusedSection();
    const textarea = focusedSectionId ? textareaRefs.current[focusedSectionId] : null;
    if (!section || !textarea) {
      window.alert("Click inside a section first, then select some text to format.");
      return;
    }
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const value = section.content;
    const selected = value.slice(start, end);
    const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
    handleContentChange(section.id, newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    });
  };

  // Insert text at the cursor position (without wrapping a selection)
  const insertAtCursor = (text: string) => {
    const section = getFocusedSection();
    const textarea = focusedSectionId ? textareaRefs.current[focusedSectionId] : null;
    if (!section || !textarea) {
      window.alert("Click inside a section first to place your cursor.");
      return;
    }
    const start = textarea.selectionStart ?? section.content.length;
    const end = textarea.selectionEnd ?? section.content.length;
    const value = section.content;
    const newValue = value.slice(0, start) + text + value.slice(end);
    handleContentChange(section.id, newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + text.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  // Prefix the current line (for lists)
  const prefixCurrentLine = (prefix: string) => {
    const section = getFocusedSection();
    const textarea = focusedSectionId ? textareaRefs.current[focusedSectionId] : null;
    if (!section || !textarea) {
      window.alert("Click inside a section first to place your cursor.");
      return;
    }
    const pos = textarea.selectionStart ?? 0;
    const value = section.content;
    const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
    const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    handleContentChange(section.id, newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = pos + prefix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const setAlignForFocusedSection = (align: SectionAlign) => {
    if (!focusedSectionId) {
      window.alert("Click inside a section first to choose its alignment.");
      return;
    }
    commitSections(sections.map((s) => (s.id === focusedSectionId ? { ...s, align } : s)));
  };

  /* ---------- Search ---------- */
  const handleSearch = () => {
    const term = window.prompt("Search in document:");
    if (!term || !term.trim()) return;
    const lower = term.trim().toLowerCase();
    const match = sections.find(
      (s) => s.title.toLowerCase().includes(lower) || s.content.toLowerCase().includes(lower)
    );
    if (!match) {
      window.alert(`No results found for "${term}".`);
      return;
    }
    const container = sectionContainerRefs.current[match.id];
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "center" });
      container.style.boxShadow = `0 0 0 2px ${COLORS.primary}`;
      setTimeout(() => {
        container.style.boxShadow = "";
      }, 1500);
    }
  };

  /* ---------- Toolbar actions ---------- */
  const TOOLBAR_ACTIONS: Record<string, () => void> = {
    undo: handleUndo,
    redo: handleRedo,
    bold: () => wrapSelection("**", "**"),
    italic: () => wrapSelection("_", "_"),
    underline: () => wrapSelection("<u>", "</u>"),
    strikethrough: () => wrapSelection("~~", "~~"),
    "align-left": () => setAlignForFocusedSection("left"),
    "align-center": () => setAlignForFocusedSection("center"),
    "align-right": () => setAlignForFocusedSection("right"),
    "align-justify": () => setAlignForFocusedSection("justify"),
    list: () => prefixCurrentLine("- "),
    "list-ordered": () => prefixCurrentLine("1. "),
    checklist: () => prefixCurrentLine("[ ] "),
    table: () => insertAtCursor("\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n"),
    image: () => insertAtCursor("![alt text](image-url)"),
    link: () => wrapSelection("[", "](https://)"),
    code: () => wrapSelection("```\n", "\n```"),
    quote: () => prefixCurrentLine("> "),
    divider: () => insertAtCursor("\n---\n"),
    search: handleSearch,
    fullscreen: () => setIsFullscreen((v) => !v),
  };

  // Handle export -- downloads a real (plain-text) file instead of just logging.
  // NOTE: a true PDF/DOCX conversion would require a dedicated client-side
  // library or a backend endpoint; this remains a functional plain-text export for now.
  const handleExport = (format: "pdf" | "docx" | "markdown") => {
    const body = sections.map((s) => `${s.title}\n\n${s.content}`).join("\n\n---\n\n");
    const fullText = `${documentTitle}\n${"=".repeat(documentTitle.length)}\n\n${body}`;

    const extension = format === "markdown" ? "md" : format === "pdf" ? "pdf.txt" : "docx.txt";
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${documentTitle.replace(/\s+/g, "_")}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Toolbar groups
  const toolbarGroups = [
    {
      id: "history",
      buttons: [
        { id: "undo", icon: <IconUndo />, label: "Undo" },
        { id: "redo", icon: <IconRedo />, label: "Redo" },
      ],
    },
    {
      id: "formatting",
      buttons: [
        { id: "bold", icon: <IconBold />, label: "Bold" },
        { id: "italic", icon: <IconItalic />, label: "Italic" },
        { id: "underline", icon: <IconUnderline />, label: "Underline" },
        { id: "strikethrough", icon: <IconStrikethrough />, label: "Strikethrough" },
      ],
    },
    {
      id: "alignment",
      buttons: [
        { id: "align-left", icon: <IconAlignLeft />, label: "Align Left" },
        { id: "align-center", icon: <IconAlignCenter />, label: "Align Center" },
        { id: "align-right", icon: <IconAlignRight />, label: "Align Right" },
        { id: "align-justify", icon: <IconAlignJustify />, label: "Justify" },
      ],
    },
    {
      id: "lists",
      buttons: [
        { id: "list", icon: <IconList />, label: "Bullet List" },
        { id: "list-ordered", icon: <IconListOrdered />, label: "Numbered List" },
        { id: "checklist", icon: <IconChecklist />, label: "Checklist" },
      ],
    },
    {
      id: "insert",
      buttons: [
        { id: "table", icon: <IconTable />, label: "Table" },
        { id: "image", icon: <IconImage />, label: "Image" },
        { id: "link", icon: <IconLink />, label: "Link" },
        { id: "code", icon: <IconCode />, label: "Code Block" },
        { id: "quote", icon: <IconQuote />, label: "Quote" },
        { id: "divider", icon: <IconDivider />, label: "Divider" },
      ],
    },
    {
      id: "view",
      buttons: [
        { id: "search", icon: <IconSearch />, label: "Search" },
        { id: "fullscreen", icon: isFullscreen ? <IconMinimize /> : <IconFullscreen />, label: isFullscreen ? "Exit Full Screen" : "Full Screen" },
      ],
    },
  ];

  return (
    // NOTE: "documents" must be added to the `SidebarPage` union type in
    // ../layouts/Dashboardlayout.tsx, otherwise TypeScript will reject this value.
    // See chat explanation for the two possible fixes.
    <DashboardLayout active="documents">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .fade-in {
          animation: fadeInUp 0.4s ease-out both;
        }

        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }

        .toolbar-btn {
          padding: 6px 8px;
          border-radius: 6px;
          transition: all 0.15s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
        }
        .toolbar-btn:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        .toolbar-btn.active {
          background: ${COLORS.primary}15;
          color: ${COLORS.primary};
        }

        .toolbar-divider {
          width: 1px;
          height: 28px;
          background: #e2e8f0;
        }

        .document-section {
          transition: all 0.2s ease;
        }
        .document-section:hover {
          background: #fafbfc;
          border-radius: 8px;
        }
        .document-section:focus-within {
          background: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 0 0 2px ${COLORS.primary}20;
        }

        .section-title-input {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 600;
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          color: #0f172a;
          padding: 4px 0;
          transition: all 0.2s ease;
        }
        .section-title-input:focus {
          background: white;
          border-radius: 4px;
          padding: 4px 8px;
          box-shadow: 0 0 0 2px ${COLORS.primary}20;
        }

        .section-content-textarea {
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          color: #334155;
          font-size: 14px;
          line-height: 1.8;
          resize: vertical;
          padding: 4px 0;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .section-content-textarea:focus {
          background: white;
          border-radius: 4px;
          padding: 4px 8px;
          box-shadow: 0 0 0 2px ${COLORS.primary}20;
        }

        .save-indicator {
          font-size: 12px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .save-indicator.saving { color: ${COLORS.primary}; }
        .save-indicator.saved { color: #166534; }
        .save-indicator.unsaved { color: #dc2626; }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }
        .status-badge.draft { background: #f1f5f9; color: #64748b; }
        .status-badge.edited { background: #fef3c7; color: #92400e; }
        .status-badge.saved { background: #dcfce7; color: #166534; }

        .sidebar-info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-info-item:last-child {
          border-bottom: none;
        }

        .action-btn {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .action-btn:hover {
          border-color: ${COLORS.primary};
          color: ${COLORS.primary};
          background: ${COLORS.primary}05;
        }
        .action-btn.primary {
          background: ${COLORS.primary};
          color: white;
          border: none;
        }
        .action-btn.primary:hover {
          background: ${COLORS.dark};
          transform: translateY(-1px);
          box-shadow: 0 4px 16px ${COLORS.primary}30;
        }

        .editor-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: white;
          padding: 24px;
          overflow-y: auto;
        }
      `}</style>

      {/* Page banner */}
      <PageBanner
        badgeIcon={<IconDocEditor />}
        badgeLabel="DOCUMENT EDITOR"
        title="Document Editor"
        subtitle="Review, edit, and finalize your AI-generated project specification."
        action={
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span style={{ color: COLORS.textMuted }}>
              <span className="font-semibold" style={{ color: COLORS.dark }}>
                E-Commerce Mobile App
              </span>
              <span className="mx-2">•</span>
              <span>TechStart Inc.</span>
              <span className="mx-2">•</span>
              <span className="status-badge draft">Draft</span>
            </span>
            <span className={`save-indicator ${saveStatus}`}>
              {saveStatus === "saved" && (
                <>
                  <IconCheck />
                  Saved Successfully
                </>
              )}
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "unsaved" && "Unsaved changes"}
            </span>
          </div>
        }
      />

      {/* Main content */}
      <div className="grid lg:grid-cols-4 gap-6 fade-in">
        {/* Document area - 3/4 width */}
        <div className="lg:col-span-3">
          <div
            className={`bg-white rounded-[18px] shadow-lg overflow-hidden ${isFullscreen ? "editor-fullscreen" : ""}`}
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
          >
            {/* Document title */}
            <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <div className="flex items-center justify-between">
                {editingTitle ? (
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                    className="text-lg font-semibold outline-none bg-transparent border-b-2 border-[#4F84A9] px-2 py-1"
                    style={{ color: COLORS.dark }}
                    autoFocus
                  />
                ) : (
                  <h2
                    className="text-lg font-semibold cursor-pointer hover:bg-[#f1f5f9] px-2 py-1 rounded transition-colors"
                    style={{ color: COLORS.dark }}
                    onClick={() => setEditingTitle(true)}
                  >
                    {documentTitle}
                  </h2>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>
                    Last saved: {new Date().toLocaleTimeString()}
                  </span>
                  <button
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-lg text-white text-xs font-medium transition-all hover:scale-[1.02] flex items-center gap-1.5"
                    style={{ background: COLORS.primary }}
                  >
                    <IconSave /> Save
                  </button>
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-[#f1f5f9]"
                      style={{ borderColor: "#e2e8f0", color: COLORS.textMuted }}
                    >
                      Exit Full Screen
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="px-4 py-3 border-b overflow-x-auto" style={{ borderColor: "#f1f5f9" }}>
              <div className="flex items-center gap-1 min-w-max">
                {toolbarGroups.map((group, idx) => (
                  <React.Fragment key={group.id}>
                    {idx > 0 && <div className="toolbar-divider" />}
                    <div className="flex items-center gap-0.5">
                      {group.buttons.map((btn) => {
                        const focused = getFocusedSection();
                        const isAlignBtn = btn.id.startsWith("align-");
                        const isActive =
                          isAlignBtn && focused ? focused.align === btn.id.replace("align-", "") : btn.id === "fullscreen" && isFullscreen;
                        return (
                          <button
                            key={btn.id}
                            type="button"
                            onClick={() => TOOLBAR_ACTIONS[btn.id]?.()}
                            className={`toolbar-btn ${isActive ? "active" : ""}`}
                            title={btn.label}
                          >
                            {btn.icon}
                          </button>
                        );
                      })}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Document sections */}
            <div
              ref={documentRef}
              className="p-6 max-h-[600px] overflow-y-auto"
              style={{
                background: "white",
                minHeight: "400px",
              }}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionContainerRefs.current[section.id] = el)}
                  className="document-section mb-4 p-1"
                >
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleTitleChange(section.id, e.target.value)}
                    onFocus={() => setFocusedSectionId(section.id)}
                    className="section-title-input font-semibold mb-1"
                    style={{
                      fontSize: section.type === "heading1" ? "24px" : section.type === "heading2" ? "20px" : "16px",
                    }}
                    placeholder="Section title"
                  />
                  <textarea
                    ref={(el) => (textareaRefs.current[section.id] = el)}
                    value={section.content}
                    onChange={(e) => handleContentChange(section.id, e.target.value)}
                    onFocus={() => setFocusedSectionId(section.id)}
                    className="section-content-textarea"
                    style={{ textAlign: section.align }}
                    rows={section.content.split("\n").length + 1}
                    placeholder="Write your content here..."
                  />
                </div>
              ))}

              {/* Add section button */}
              <button
                className="w-full py-4 rounded-lg border-2 border-dashed transition-all text-sm"
                style={{ borderColor: "#e2e8f0", color: COLORS.textMuted }}
                onClick={() => {
                  const newSection: DocumentSection = {
                    id: `section-${Date.now()}`,
                    title: "New Section",
                    content: "Write your content here...",
                    type: "heading2",
                    align: "left",
                  };
                  commitSections([...sections, newSection]);
                  setFocusedSectionId(newSection.id);
                }}
              >
                + Add Section
              </button>
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: "#f1f5f9" }}>
              <button onClick={handleSave} className="action-btn primary px-6 py-2.5">
                <IconSave /> Save Changes
              </button>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleExport("pdf")} className="action-btn">
                  <IconPDF /> PDF
                </button>
                <button onClick={() => handleExport("docx")} className="action-btn">
                  <IconWord /> DOCX
                </button>
                <button onClick={() => handleExport("markdown")} className="action-btn">
                  <IconMarkdown /> MD
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({ title: documentTitle, text: "Check out this project specification." })
                        .catch(() => {
                          /* User cancelled the share -- do nothing */
                        });
                    } else {
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => {
                          window.alert("Link copied to clipboard!");
                        })
                        .catch(() => {
                          // Silently ignore failure (e.g. if the user denies permission)
                        });
                    }
                  }}
                  className="action-btn"
                >
                  <IconShare /> Share
                </button>
                <button
                  onClick={() => {
                    setDocumentTitle((t) => `${t} (Copy)`);
                    setSaveStatus("unsaved");
                  }}
                  className="action-btn"
                >
                  <IconDuplicate /> Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - 1/4 width */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[18px] shadow-lg p-6 sticky top-24" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
            <h4 className="font-semibold mb-4" style={{ color: COLORS.dark }}>
              Document Info
            </h4>

            <div className="space-y-2">
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Status</span>
                <span className="status-badge draft">Draft</span>
              </div>
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Version</span>
                <span className="font-medium" style={{ color: COLORS.dark }}>
                  v1.2
                </span>
              </div>
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Last AI Update</span>
                <span className="text-sm" style={{ color: COLORS.dark }}>
                  2 hours ago
                </span>
              </div>
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Reading Time</span>
                <span className="text-sm" style={{ color: COLORS.dark }}>
                  ~{Math.ceil(wordCount / 200)} min
                </span>
              </div>
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Word Count</span>
                <span className="text-sm font-medium" style={{ color: COLORS.dark }}>
                  {wordCount}
                </span>
              </div>
              <div className="sidebar-info-item">
                <span style={{ color: COLORS.textMuted }}>Character Count</span>
                <span className="text-sm font-medium" style={{ color: COLORS.dark }}>
                  {charCount}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: "#f1f5f9" }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.textMuted }}>
                <IconClock />
                <span>Auto-save enabled</span>
              </div>
              <div className="mt-2 text-xs" style={{ color: COLORS.textMuted }}>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  {saveStatus === "saved" && "Saved successfully"}
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "unsaved" && "Unsaved changes"}
                </span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#f1f5f9" }}>
              <button
                onClick={() => navigate("/ai-contract-generator")}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[#f1f5f9]"
                style={{ color: COLORS.primary }}
              >
                ← Back to AI Generator
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentEditor;
