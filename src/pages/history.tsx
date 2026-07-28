// pages/History.tsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { COLORS } from "../layouts/AuthLayout";
import { useData } from "../context/DataContext";
import { Contract } from "../types";

/* ---------- Icons ---------- */
const IconHistory = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
    <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const IconOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
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

const IconDuplicate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
  </svg>
);

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStarFilled = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.coral} stroke={COLORS.coral} strokeWidth="1.8">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFileText = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Main Component ---------- */
const History: React.FC = () => {
  const navigate = useNavigate();
  // Real, persisted contracts + CRUD actions from DataContext instead of
  // a static mock import + local-only useState.
  const { contracts, addContract, deleteContract, toggleContractFavorite } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "completed" | "archived">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "modified" | "name">("newest");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Filter and sort contracts
  const filteredContracts = useMemo(() => {
    let result = contracts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.projectName.toLowerCase().includes(query) ||
          c.clientName.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      result = result.filter((c) => c.status === filterStatus);
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "modified":
          return b.lastModified.getTime() - a.lastModified.getTime();
        case "name":
          return a.projectName.localeCompare(b.projectName);
        default:
          return 0;
      }
    });

    return result;
  }, [contracts, searchQuery, filterStatus, sortBy]);

  // Statistics
  const stats = {
    total: contracts.length,
    draft: contracts.filter((c) => c.status === "draft").length,
    completed: contracts.filter((c) => c.status === "completed").length,
    archived: contracts.filter((c) => c.status === "archived").length,
  };

  // Status badge colors
  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "draft":
        return { bg: "#fef3c7", color: "#92400e", label: "Draft" };
      case "completed":
        return { bg: "#dcfce7", color: "#166534", label: "Completed" };
      case "archived":
        return { bg: "#f1f5f9", color: "#64748b", label: "Archived" };
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    deleteContract(id);
    setShowDeleteConfirm(null);
  };

  // Handle duplicate
  const handleDuplicate = (contract: Contract) => {
    // addContract fills in id / createdAt / lastModified automatically.
    addContract({
      projectId: contract.projectId,
      projectName: `${contract.projectName} (Copy)`,
      clientId: contract.clientId,
      clientName: contract.clientName,
      status: "draft",
      version: "v1.0",
      type: contract.type,
      description: contract.description,
      readingTime: contract.readingTime,
      wordCount: contract.wordCount,
      isFavorite: false,
      content: contract.content,
      sections: contract.sections,
      generatedBy: contract.generatedBy,
      template: contract.template,
    });
  };

  // Handle toggle favorite
  const toggleFavorite = (id: string) => {
    toggleContractFavorite(id);
  };

  // Real download (instead of a plain console.log) -- plain-text export
  // while a real PDF/DOCX generation is not wired up on the backend yet.
  const handleDownload = (contract: Contract, format: "pdf" | "docx") => {
    const content = `${contract.projectName}\nClient: ${contract.clientName}\nVersion: ${contract.version}\n\n${contract.description}`;
    const extension = format === "pdf" ? "pdf.txt" : "docx.txt";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contract.projectName.replace(/\s+/g, "_")}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <DashboardLayout active="history">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .fade-in {
          animation: fadeInUp 0.4s ease-out both;
        }
        .slide-in {
          animation: slideIn 0.3s ease-out both;
        }

        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }

        .stats-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .search-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
        }
        .search-wrapper:focus-within {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15;
          transform: translateY(-2px);
          background: rgba(255,255,255,0.95);
        }

        .filter-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .filter-btn:hover {
          background: ${COLORS.primary}08;
        }
        .filter-btn.active {
          background: ${COLORS.primary}12;
          color: ${COLORS.primary};
          font-weight: 500;
        }

        .contract-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.4s ease-out both;
          position: relative;
        }
        .contract-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .contract-card:hover .card-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .card-actions {
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-icon-btn {
          padding: 6px;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-icon-btn:hover {
          background: #f1f5f9;
          color: #334155;
        }
        .action-icon-btn.danger:hover {
          background: #fee2e2;
          color: #dc2626;
        }
        .action-icon-btn.primary:hover {
          background: ${COLORS.primary}10;
          color: ${COLORS.primary};
        }
        .action-icon-btn.favorite:hover {
          background: ${COLORS.coral}15;
          color: ${COLORS.coral};
        }

        .status-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }

        .delete-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInUp 0.3s ease;
        }
        .delete-modal-content {
          background: white;
          border-radius: 20px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.15);
        }

        .empty-state {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      {/* Page Banner */}
      <PageBanner
        badgeIcon={<IconHistory />}
        badgeLabel="HISTORY"
        title="History"
        subtitle="Access, manage, and organize all your AI-generated project specifications in one place."
        action={
          <button
            onClick={() => navigate("/ai-contract-generator")}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
              boxShadow: `0 4px 20px ${COLORS.primary}25`,
            }}
          >
            <IconPlus />
            ✦ New Contract
          </button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="stats-card bg-white rounded-[18px] p-4 shadow-sm" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
            Total
          </p>
          <p className="text-2xl font-bold" style={{ color: COLORS.dark }}>
            {stats.total}
          </p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            All contracts
          </p>
        </div>
        <div className="stats-card bg-white rounded-[18px] p-4 shadow-sm" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
            Draft
          </p>
          <p className="text-2xl font-bold" style={{ color: "#92400e" }}>
            {stats.draft}
          </p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            In progress
          </p>
        </div>
        <div className="stats-card bg-white rounded-[18px] p-4 shadow-sm" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
            Completed
          </p>
          <p className="text-2xl font-bold" style={{ color: "#166534" }}>
            {stats.completed}
          </p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Ready for review
          </p>
        </div>
        <div className="stats-card bg-white rounded-[18px] p-4 shadow-sm" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
            Archived
          </p>
          <p className="text-2xl font-bold" style={{ color: "#64748b" }}>
            {stats.archived}
          </p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Old contracts
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-[18px] p-4 shadow-sm mb-6" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <div className="search-wrapper flex items-center gap-2.5 rounded-xl px-4 py-2.5 border" style={{ borderColor: "#E5E9EC" }}>
              <IconSearch />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, client, or keywords..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: COLORS.text }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {["all", "draft", "completed", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as typeof filterStatus)}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filterStatus === status ? "active" : ""}`}
                style={{
                  background: filterStatus === status ? `${COLORS.primary}12` : "transparent",
                  color: filterStatus === status ? COLORS.primary : COLORS.textMuted,
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 rounded-xl border text-sm outline-none cursor-pointer"
              style={{ borderColor: "#E5E9EC", color: COLORS.text, background: "white" }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="modified">Last Modified</option>
              <option value="name">Project Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contract Library */}
      {filteredContracts.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredContracts.map((contract, index) => {
            const status = getStatusBadge(contract.status);
            return (
              <div
                key={contract.id}
                className="contract-card bg-white rounded-[18px] p-5 shadow-sm"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  animationDelay: `${index * 60}ms`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold truncate" style={{ color: COLORS.dark }}>
                        {contract.projectName}
                      </h3>
                      <button onClick={() => toggleFavorite(contract.id)} className="flex-shrink-0">
                        {contract.isFavorite ? <IconStarFilled /> : <IconStar />}
                      </button>
                    </div>
                    <p className="text-sm truncate" style={{ color: COLORS.textMuted }}>
                      {contract.clientName}
                    </p>
                  </div>
                  <span className="status-badge ml-2 flex-shrink-0" style={{ background: status.bg, color: status.color }}>
                    {status.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "#475569" }}>
                  {contract.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: COLORS.textMuted }}>
                  <span className="flex items-center gap-1">
                    <IconFileText />
                    {contract.type}
                  </span>
                  <span>•</span>
                  <span>{contract.version}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IconClock />
                    {contract.readingTime} min
                  </span>
                </div>

                {/* Dates */}
                <div className="flex justify-between text-xs mb-3" style={{ color: COLORS.textMuted }}>
                  <span>Created: {formatDate(contract.createdAt)}</span>
                  <span>Updated: {formatDate(contract.lastModified)}</span>
                </div>

                {/* Actions */}
                <div className="card-actions flex items-center gap-1 pt-3 border-t" style={{ borderColor: "#f1f5f9" }}>
                  <button
                    onClick={() => navigate(`/document-editor?id=${contract.id}`)}
                    className="action-icon-btn primary"
                    title="Open Document"
                  >
                    <IconOpen />
                  </button>
                  <button
                    onClick={() => navigate(`/document-editor?edit=${contract.id}`)}
                    className="action-icon-btn primary"
                    title="Continue Editing"
                  >
                    <IconEdit />
                  </button>
                  <div className="w-px h-6" style={{ background: "#e2e8f0" }} />
                  <button onClick={() => handleDownload(contract, "pdf")} className="action-icon-btn" title="Download PDF">
                    <IconPDF />
                  </button>
                  <button onClick={() => handleDownload(contract, "docx")} className="action-icon-btn" title="Download DOCX">
                    <IconWord />
                  </button>
                  <div className="w-px h-6" style={{ background: "#e2e8f0" }} />
                  <button onClick={() => handleDuplicate(contract)} className="action-icon-btn" title="Duplicate">
                    <IconDuplicate />
                  </button>
                  <button onClick={() => setShowDeleteConfirm(contract.id)} className="action-icon-btn danger" title="Delete">
                    <IconTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state bg-white rounded-[20px] p-12 text-center" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.dark }}>
            No project specifications have been generated yet.
          </h3>
          <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
            Start by creating your first AI-generated contract specification.
          </p>
          <button
            onClick={() => navigate("/ai-contract-generator")}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
              boxShadow: `0 4px 20px ${COLORS.primary}25`,
            }}
          >
            <IconPlus />
            Create New Project
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal" onClick={() => setShowDeleteConfirm(null)}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.dark }}>
                Delete Contract?
              </h3>
              <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
                This action cannot be undone. The contract will be permanently removed.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[#f1f5f9]"
                  style={{ color: COLORS.textMuted }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-[1.02]"
                  style={{ background: "#dc2626" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default History;
