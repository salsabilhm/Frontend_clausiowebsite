import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import ProjectCard from "../components/Projectcard";
import { useData } from "../context/DataContext";
import { ProjectStatus, ProjectCardData } from "../types";

/* ---------- Icons ---------- */
const IconFolder = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeLinejoin="round" />
  </svg>
);

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const IconFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5h16M7 12h10M10 19h4" strokeLinecap="round" />
  </svg>
);

const IconSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.coral} strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

const FILTERS: ("All" | ProjectStatus)[] = ["All", "Completed", "Processing", "Draft"];

const Projects: React.FC = () => {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectStatus>("All");
  const [query, setQuery] = useState("");

  // ✅ تحويل Project[] إلى ProjectCardData[]
  const filtered = useMemo<ProjectCardData[]>(() => {
    return projects
      .filter((p) => {
        const matchesFilter = activeFilter === "All" || p.status === activeFilter;
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      })
      .map((p) => ({
        name: p.name,
        client: p.clientName,                    // ✅ تحويل clientName إلى client
        clientColor: p.clientColor || COLORS.primary,
        source: p.source,
        status: p.status,
        progress: p.progress,
        updatedAgo: p.updatedAgo || "Recently",
      }));
  }, [projects, activeFilter, query]);

  return (
    <DashboardLayout active="projects">
      {/* Styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatSearch {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,132,169,0.2); }
          50% { box-shadow: 0 0 20px 4px rgba(79,132,169,0.08); }
        }

        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        .cursive-subtitle {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .cursive-label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .search-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatSearch 4s ease-in-out infinite;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .search-wrapper:focus-within {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15, 0 8px 30px ${COLORS.primary}10;
          transform: translateY(-2px);
          background: rgba(255,255,255,0.95);
        }
        .search-input {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
        .search-input::placeholder {
          color: ${COLORS.textMuted};
          opacity: 0.7;
          font-style: italic;
        }

        .filter-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.04em;
          cursor: pointer;
        }
        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(79,132,169,0.15);
        }
        .filter-btn-active {
          background: ${COLORS.primary}14;
          border-color: ${COLORS.primary};
          color: ${COLORS.primary};
          box-shadow: 0 4px 20px ${COLORS.primary}15;
        }

        .new-project-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
          cursor: pointer;
        }
        .new-project-btn:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 8px 30px ${COLORS.primary}35;
        }

        .empty-state {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Page banner */}
      <PageBanner
        badgeIcon={<IconFolder />}
        badgeLabel="PROJECTS"
        title="All Projects"
        subtitle="Browse and manage your AI-generated project specifications."
        action={
          /* 👈 تم التبديل إلى Link للانتقال المباشر لصفحة /projects/new */
          <Link
            to="/projects/new"
            className="new-project-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-semibold no-underline"
            style={{
              background: COLORS.dark,
              boxShadow: `0 4px 20px ${COLORS.primary}25`,
            }}
          >
            <IconPlus /> ✦ New Project
          </Link>
        }
      />

      {/* Search + filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        {/* Search bar */}
        <div
          className="search-wrapper flex items-center gap-2.5 flex-1 rounded-full px-4 py-3 border"
          style={{ borderColor: "#E5E9EC" }}
        >
          <IconSearch />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="search-input flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: COLORS.text }}
          />
          <span className="cmd-badge text-[10px] font-medium rounded px-2 py-0.5" style={{ background: "#F1F3F5", color: COLORS.textMuted }}>
            ⌘F
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-btn inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-medium border transition-all ${
                  isActive ? "filter-btn-active" : ""
                }`}
                style={{
                  borderColor: isActive ? COLORS.primary : "#E5E9EC",
                  background: isActive ? `${COLORS.primary}14` : "rgba(255,255,255,0.8)",
                  color: isActive ? COLORS.primary : COLORS.text,
                  backdropFilter: isActive ? "none" : "blur(4px)",
                }}
              >
                {f === "All" && <IconFilter />}
                {f === "Completed" && <span style={{ color: "#16A34A" }}>●</span>}
                {f === "Processing" && <span style={{ color: COLORS.primary }}>●</span>}
                {f === "Draft" && <span style={{ color: COLORS.sand }}>●</span>}
                {f}
                {f !== "All" && (
                  <span className="text-[10px] opacity-60">
                    ({projects.filter((p) => p.status === f).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 empty-state" style={{ color: COLORS.textMuted }}>
          <div className="text-4xl mb-4">📁</div>
          <p className="text-lg" style={{ color: COLORS.text }}>
            No projects match your search.
          </p>
          <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveFilter("All");
            }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border cursor-pointer"
            style={{ borderColor: "#E5E9EC", color: COLORS.primary }}
          >
            <IconSparkle /> Clear filters
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Projects;
