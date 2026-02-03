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

export function RelationshipGraph({
  names,
  className = "",
  height = 600,
}: RelationshipGraphProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height });
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [mounted, setMounted] = useState(false);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [height]);

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
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={className}>
      {/* Language Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
          Filter by language:
        </span>
        {Object.entries(LANGUAGE_COLORS).map(([language, color]) => (
          <button
            key={language}
            onClick={() => toggleLanguage(language)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
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
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </button>
        ))}
        {selectedLanguages.length > 0 && (
          <button
            onClick={() => setSelectedLanguages([])}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {Object.entries(LANGUAGE_COLORS).map(([language, color]) => (
          <div key={language} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="capitalize text-gray-600 dark:text-gray-400">
              {language}
            </span>
          </div>
        ))}
      </div>

      {/* Graph Container */}
      <div
        ref={containerRef}
        className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
        style={{ height }}
      >
        {graphData.nodes.length > 0 ? (
          <ForceGraph2D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeLabel={(node) =>
              `${(node as { name?: string }).name || ""}\n${(node as { meaning?: string }).meaning || ""}`
            }
            nodeColor={(node) => (node as { color?: string }).color || "#9ca3af"}
            nodeRelSize={6}
            linkColor={() => (isDark ? "#4b5563" : "#d1d5db")}
            linkWidth={1.5}
            onNodeClick={handleNodeClick}
            cooldownTicks={100}
            onEngineStop={() => {}}
            enableNodeDrag={true}
            enableZoomInteraction={true}
            enablePanInteraction={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data to display</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Showing {graphData.nodes.length} names with {graphData.links.length}{" "}
        connections
      </div>
    </div>
  );
}
