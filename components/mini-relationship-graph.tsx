"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  getSubgraph,
  LANGUAGE_COLORS,
  type NameRecord,
  type GraphData,
} from "@/lib/graph-utils";
import { generateSlug } from "@/lib/slug";
import { useI18n } from "./i18n-provider";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-sm">Loading graph...</p>
    </div>
  ),
});

interface MiniRelationshipGraphProps {
  names: NameRecord[];
  centerId: string;
  centerName: string;
  className?: string;
}

export function MiniRelationshipGraph({
  names,
  centerId,
  centerName,
  className = "",
}: MiniRelationshipGraphProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const mobile = width < 640;
        setIsMobile(mobile);
        setDimensions({
          width,
          height: mobile ? 250 : 300,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const data = getSubgraph(names, centerId, isDark);
    setGraphData(data);
  }, [names, centerId, resolvedTheme]);

  const handleNodeClick = useCallback(
    (node: { id?: string | number; name?: string; language?: string }) => {
      if (node.id && node.id !== centerId && node.name && node.language) {
        router.push(`/names/${generateSlug(node.name, node.language)}`);
      }
    },
    [router, centerId]
  );

  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center h-[300px]`}>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (graphData.nodes.length <= 1) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">{t("graph.relationshipMap")}</h2>
        <Link
          href="/graph"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t("graph.viewFullMap")}
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-3 text-xs">
        {Object.entries(LANGUAGE_COLORS).map(([language, color]) => (
          <div key={language} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="capitalize text-gray-600 dark:text-gray-400">
              {language}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
        style={{ height: dimensions.height }}
      >
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={(node) => {
            const n = node as { name?: string; meaning?: string; id?: string };
            if (n.id === centerId) return `${n.name || ""} (current)`;
            return `${n.name || ""}\n${n.meaning || ""}`;
          }}
          nodeColor={(node) => {
            const n = node as { color?: string; id?: string };
            return n.color || "#9ca3af";
          }}
          nodeRelSize={isMobile ? 4 : 5}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const n = node as { x?: number; y?: number; color?: string; name?: string; id?: string };
            const x = n.x || 0;
            const y = n.y || 0;
            const isCenter = n.id === centerId;
            const radius = isCenter ? (isMobile ? 6 : 8) : (isMobile ? 4 : 5);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = n.color || "#9ca3af";
            ctx.fill();

            if (isCenter) {
              ctx.strokeStyle = isDark ? "#fff" : "#000";
              ctx.lineWidth = isMobile ? 1.5 : 2;
              ctx.stroke();
            }

            // Skip text labels on mobile for non-center nodes when zoomed out
            if (isMobile && !isCenter && globalScale < 1.5) return;

            const fontSize = isCenter
              ? (isMobile ? 10 : 12) / globalScale
              : (isMobile ? 8 : 10) / globalScale;
            ctx.font = `${isCenter ? "bold " : ""}${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = isDark ? "#e5e7eb" : "#374151";
            ctx.fillText(n.name || "", x, y + radius + 2);
          }}
          linkColor={() => (isDark ? "#4b5563" : "#d1d5db")}
          linkWidth={isMobile ? 1 : 1.5}
          onNodeClick={handleNodeClick}
          cooldownTicks={isMobile ? 30 : 50}
          warmupTicks={isMobile ? 20 : 0}
          d3AlphaDecay={isMobile ? 0.05 : 0.0228}
          d3VelocityDecay={isMobile ? 0.5 : 0.4}
          enableNodeDrag={!isMobile}
          enableZoomInteraction={true}
          enablePanInteraction={true}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {t("graph.showing")} {graphData.nodes.length} {t("graph.connectedNames")}
      </p>
    </div>
  );
}
