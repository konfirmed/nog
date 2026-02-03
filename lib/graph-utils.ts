// Graph utilities for transforming database data into graph format

export interface NameRecord {
  id: string;
  name: string;
  language: "yoruba" | "hebrew" | "mandarin";
  meaning?: string;
  related_names?: string[];
}

export interface GraphNode {
  id: string;
  name: string;
  language: "yoruba" | "hebrew" | "mandarin";
  meaning: string;
  color: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Color scheme for each language
export const LANGUAGE_COLORS: Record<string, string> = {
  yoruba: "#22c55e", // green-500
  hebrew: "#3b82f6", // blue-500
  mandarin: "#ef4444", // red-500
};

// Lighter colors for dark mode
export const LANGUAGE_COLORS_DARK: Record<string, string> = {
  yoruba: "#4ade80", // green-400
  hebrew: "#60a5fa", // blue-400
  mandarin: "#f87171", // red-400
};

/**
 * Transform database records into graph data format
 */
export function transformToGraphData(
  names: NameRecord[],
  isDarkMode: boolean = false
): GraphData {
  const colors = isDarkMode ? LANGUAGE_COLORS_DARK : LANGUAGE_COLORS;
  const nodeIds = new Set(names.map((n) => n.id));

  // Build nodes
  const nodes: GraphNode[] = names.map((n) => ({
    id: n.id,
    name: n.name,
    language: n.language,
    meaning: n.meaning || "",
    color: colors[n.language] || "#9ca3af", // gray-400 as fallback
  }));

  // Build links (edges), avoiding duplicates
  const linkSet = new Set<string>();
  const links: GraphLink[] = [];

  names.forEach((n) => {
    (n.related_names || []).forEach((relatedId) => {
      // Only create links to nodes that exist in our dataset
      if (!nodeIds.has(relatedId)) return;

      // Create a consistent key to avoid duplicate edges
      const key = [n.id, relatedId].sort().join("-");
      if (!linkSet.has(key)) {
        linkSet.add(key);
        links.push({ source: n.id, target: relatedId });
      }
    });
  });

  return { nodes, links };
}

/**
 * Get subgraph for a specific name and its immediate relationships
 */
export function getSubgraph(
  names: NameRecord[],
  centerId: string,
  isDarkMode: boolean = false
): GraphData {
  const centerName = names.find((n) => n.id === centerId);
  if (!centerName) {
    return { nodes: [], links: [] };
  }

  // Get the center node and all directly related nodes
  const relatedIds = new Set(centerName.related_names || []);
  relatedIds.add(centerId);

  // Also include nodes that point TO the center node
  names.forEach((n) => {
    if (n.related_names?.includes(centerId)) {
      relatedIds.add(n.id);
    }
  });

  // Filter to only the relevant names
  const subsetNames = names.filter((n) => relatedIds.has(n.id));

  return transformToGraphData(subsetNames, isDarkMode);
}

/**
 * Filter graph data by language
 */
export function filterByLanguage(
  graphData: GraphData,
  languages: string[]
): GraphData {
  if (!languages.length) return graphData;

  const filteredNodes = graphData.nodes.filter((n) =>
    languages.includes(n.language)
  );
  const nodeIds = new Set(filteredNodes.map((n) => n.id));

  const filteredLinks = graphData.links.filter(
    (l) =>
      nodeIds.has(l.source as string) && nodeIds.has(l.target as string)
  );

  return { nodes: filteredNodes, links: filteredLinks };
}
