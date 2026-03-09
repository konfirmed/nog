'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function WebMCPTools() {
  const router = useRouter();

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('modelContext' in navigator)) {
      return;
    }

    const mc = (navigator as any).modelContext;
    const cleanups: (() => void)[] = [];

    // Tool: Search divine names
    const searchTool = mc.registerTool({
      name: 'search_names',
      description:
        'Search for divine names across cultures and languages. Returns matching names with their meanings, pronunciations, and attributes.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to find names by name, meaning, or pronunciation',
          },
          language: {
            type: 'string',
            description:
              'Filter by language: yoruba, hebrew, welsh, hindi, yiddish, hausa, wolof, haitian_creole, wu_chinese, mandarin',
          },
          attributes: {
            type: 'string',
            description:
              'Comma-separated attribute filters (e.g. "Creator,Healer,Protector")',
          },
        },
      },
      async execute(args: { query?: string; language?: string; attributes?: string }) {
        const params = new URLSearchParams();
        if (args.query) params.set('q', args.query);
        if (args.language) params.set('language', args.language);
        if (args.attributes) params.set('attributes', args.attributes);

        const res = await fetch(`/api/names?${params.toString()}`);
        const data = await res.json();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                total: data.total,
                names: data.names.map((n: any) => ({
                  id: n.id,
                  name: n.name,
                  language: n.language,
                  meaning: n.meaning,
                  pronunciation: n.pronunciation,
                  attributes: n.attribute,
                })),
              }),
            },
          ],
        };
      },
    });
    if (searchTool) cleanups.push(searchTool);

    // Tool: Get full details of a name by ID
    const detailTool = mc.registerTool({
      name: 'get_name_details',
      description:
        'Get full details of a specific divine name including meaning, scripture references, context of use, and divine personality.',
      inputSchema: {
        type: 'object',
        properties: {
          name_id: {
            type: 'string',
            description: 'The UUID of the name to look up',
          },
        },
        required: ['name_id'],
      },
      async execute(args: { name_id: string }) {
        const res = await fetch(`/api/names?q=`);
        const data = await res.json();
        const name = data.names.find((n: any) => n.id === args.name_id);
        if (!name) {
          return { content: [{ type: 'text', text: 'Name not found' }] };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(name) }],
        };
      },
    });
    if (detailTool) cleanups.push(detailTool);

    // Tool: Navigate to compare page with selected names
    const compareTool = mc.registerTool({
      name: 'compare_names',
      description:
        'Navigate to the comparison view to compare two or more divine names side by side. Provide name IDs to compare.',
      inputSchema: {
        type: 'object',
        properties: {
          name_ids: {
            type: 'string',
            description:
              'Comma-separated UUIDs of names to compare (at least 2)',
          },
        },
        required: ['name_ids'],
      },
      async execute(args: { name_ids: string }) {
        router.push(`/compare?ids=${args.name_ids}`);
        return {
          content: [
            {
              type: 'text',
              text: `Navigated to comparison view with names: ${args.name_ids}`,
            },
          ],
        };
      },
    });
    if (compareTool) cleanups.push(compareTool);

    // Tool: List available languages
    const langTool = mc.registerTool({
      name: 'list_languages',
      description:
        'List all available languages in the divine names database.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      async execute() {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify([
                'yoruba', 'hebrew', 'welsh', 'hindi', 'yiddish',
                'hausa', 'wolof', 'haitian_creole', 'wu_chinese', 'mandarin',
              ]),
            },
          ],
        };
      },
    });
    if (langTool) cleanups.push(langTool);

    // Tool: Navigate to relationship graph
    const graphTool = mc.registerTool({
      name: 'view_relationship_graph',
      description:
        'Navigate to the interactive relationship graph showing connections between divine names.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      async execute() {
        router.push('/graph');
        return {
          content: [
            { type: 'text', text: 'Navigated to the relationship graph view.' },
          ],
        };
      },
    });
    if (graphTool) cleanups.push(graphTool);

    return () => {
      cleanups.forEach((cleanup) => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, [router]);

  return null;
}
