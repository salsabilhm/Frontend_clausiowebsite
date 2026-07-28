import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // 👈 تم إضافة Link للتوجيه السريع بدون Reload
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import ClientCard from "../components/ClientCard";
import { useData } from "../context/DataContext";

/* ---------- Icons ---------- */
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" strokeLinecap="round" />
    <path d="M16 8.5a3 3 0 1 1 0 5.9M20 20c0-2.8-2-5-4.7-5.7" strokeLinecap="round" />
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
const IconSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.coral} strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

const Clients: React.FC = () => {
  // Real, persisted data from DataContext instead of a static mock import.
  const { clients } = useData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      clients.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.company.toLowerCase().includes(query.toLowerCase())
      ),
    [clients, query]
  );

  return (
    <DashboardLayout active="clients">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSearch {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
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

        .client-card {
          animation: fadeInUp 0.5s ease-out both;
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

        .new-client-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
        }
        .new-client-btn:hover {
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

      <PageBanner
        badgeIcon={<IconUsers />}
        badgeLabel="CLIENTS"
        title="Client Directory"
        subtitle="Manage your clients and their project specifications."
        action={
          /* 👈 تم استخدام Link بدلاً من a للحفاظ على سياق React Router */
          <Link
            to="/clients/new"
            className="new-client-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-semibold no-underline"
            style={{
              background: COLORS.dark,
              boxShadow: `0 4px 20px ${COLORS.primary}25`,
            }}
          >
            <IconPlus />
            ✦ New Client
          </Link>
        }
      />

      {/* Search */}
      <div
        className="search-wrapper flex items-center gap-2.5 rounded-full px-4 py-3 border mb-6 max-w-xl"
        style={{ borderColor: "#E5E9EC" }}
      >
        <IconSearch />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients..."
          className="search-input flex-1 bg-transparent outline-none text-[14px]"
          style={{ color: COLORS.text }}
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((client, i) => (
          <div key={client.id} style={{ animationDelay: `${i * 60}ms` }} className="client-card">
            <ClientCard client={client} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 empty-state" style={{ color: COLORS.textMuted }}>
          <div className="text-4xl mb-4">🗂️</div>
          <p className="text-lg" style={{ color: COLORS.text }}>
            No clients match your search.
          </p>
          <p className="text-sm mt-1">Try a different name or company.</p>
          <button
            onClick={() => setQuery("")}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border cursor-pointer"
            style={{ borderColor: "#E5E9EC", color: COLORS.primary }}
          >
            <IconSparkle /> Clear search
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Clients;
