"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  transformToGraphData,
  filterByLanguage,
  LANGUAGE_COLORS,
  type NameRecord,
  type GraphData,
} from "@/lib/graph-utils";
import { generateSlug } from "@/lib/slug";
import { useI18n } from "./i18n-provider";

// Dynamic import to avoid SSR issues with canvas
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Loading graph...</p>
    </div>
  ),
});

interface RelationshipGraphProps {
  names: NameRecord[];
  className?: string;
  height?: number;
}

// Language display names for better readability
const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  yoruba: "Yoruba",
  hebrew: "Hebrew",
  welsh: "Welsh",
  hindi: "Hindi",
  yiddish: "Yiddish",
  hausa: "Hausa",
  wolof: "Wolof",
  haitian_creole: "Haitian",
  wu_chinese: "Wu",
  mandarin: "Mandarin",
};

export function RelationshipGraph({
  names,
  className = "",
  height = 600,
}: RelationshipGraphProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update dimensions on resize with mobile detection
  useEffect(() => {
    if (!mounted) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const mobile = width < 640;
        setIsMobile(mobile);
        // Reduce height on mobile for better UX
        const responsiveHeight = mobile ? Math.min(400, height) : height;
        setDimensions({
          width: Math.max(width, 300), // minimum width
          height: responsiveHeight,
        });
      }
    };

    // Initial measurement with small delay to ensure container is rendered
    const timeoutId = setTimeout(updateDimensions, 50);

    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [height, mounted]);

  // Transform data when names or filters change
  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    let data = transformToGraphData(names, isDark);

    if (selectedLanguages.length > 0) {
      data = filterByLanguage(data, selectedLanguages);
    }

    setGraphData(data);
  }, [names, selectedLanguages, resolvedTheme]);

  // Handle node click - navigate to detail page
  const handleNodeClick = useCallback(
    (node: { id?: string | number; name?: string; language?: string }) => {
      if (node.id && node.name && node.language) {
        router.push(`/names/${generateSlug(node.name, node.language)}`);
      }
    },
    [router]
  );

  // Toggle language filter
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  // Don't render graph until mounted (avoids hydration issues)
  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center`} style={{ height }}>
        <p className="text-gray-500">{t("graph.loading")}</p>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={`${className} overflow-x-hidden`}>
      {/* Language Filter */}
      <div className="mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
          {t("graph.filterByLanguage")}
        </span>
        <div className="grid grid-cols-5 sm:flex sm:flex-wrap gap-1 sm:gap-2">
          {Object.entries(LANGUAGE_COLORS).map(([language, color]) => (
            <button
              key={language}
              type="button"
              onClick={() => toggleLanguage(language)}
              className={`px-1.5 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full border transition-colors truncate ${
                selectedLanguages.length === 0 || selectedLanguages.includes(language)
                  ? "opacity-100"
                  : "opacity-40"
              }`}
              style={{
                borderColor: color,
                backgroundColor:
                  selectedLanguages.includes(language) || selectedLanguages.length === 0
                    ? `${color}20`
                    : "transparent",
                color: isDark ? color : undefined,
              }}
            >
              {LANGUAGE_DISPLAY_NAMES[language] || language}
            </button>
          ))}
        </div>
        {selectedLanguages.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedLanguages([])}
            className="mt-2 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {t("graph.clearFilters")}
          </button>
        )}
      </div>

      {/* Legend - responsive grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-x-2 gap-y-1 mb-3 sm:mb-4">
        {Object.entries(LANGUAGE_COLORS).map(([language, color]) => (
          <div key={language} className="flex items-center gap-1">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">
              {LANGUAGE_DISPLAY_NAMES[language] || language}
            </span>
          </div>
        ))}
      </div>

      {/* Graph Container */}
      <div
        ref={containerRef}
        className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 touch-pan-y w-full"
        style={{ height: dimensions?.height || (isMobile ? 400 : height) }}
      >
        {!dimensions ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">{t("graph.initializing")}</p>
          </div>
        ) : graphData.nodes.length > 0 ? (
          <ForceGraph2D
            key={`${dimensions.width}-${dimensions.height}`}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeLabel={(node) =>
              `${(node as { name?: string }).name || ""}\n${(node as { meaning?: string }).meaning || ""}`
            }
            nodeColor={(node) => (node as { color?: string }).color || "#9ca3af"}
            nodeRelSize={isMobile ? 4 : 6}
            linkColor={() => (isDark ? "#4b5563" : "#d1d5db")}
            linkWidth={isMobile ? 1 : 1.5}
            onNodeClick={handleNodeClick}
            cooldownTicks={isMobile ? 60 : 100}
            onEngineStop={() => {}}
            enableNodeDrag={!isMobile}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            d3AlphaDecay={isMobile ? 0.05 : 0.0228}
            d3VelocityDecay={isMobile ? 0.5 : 0.4}
            warmupTicks={isMobile ? 30 : 0}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">{t("graph.noData")}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {t("graph.showing")} {graphData.nodes.length} {t("graph.namesWith")} {graphData.links.length} {t("graph.connections")}
      </div>

      {/* Mobile tip */}
      {isMobile && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {t("graph.mobileTip")}
        </p>
      )}
    </div>
  );
}
