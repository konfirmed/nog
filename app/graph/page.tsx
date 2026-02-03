import { supabase } from "@/utils/supabase/client";
import { RelationshipGraph } from "@/components/relationship-graph";
import Link from "next/link";

export const metadata = {
  title: "Relationship Map | Names of G_D",
  description:
    "Explore the connections between divine names across Yoruba, Hebrew, Welsh, Hindi, Yiddish, Hausa, Wolof, Haitian Creole, Wu Chinese, and Mandarin traditions.",
};

export default async function GraphPage() {
  const { data: names, error } = await supabase
    .from("names_of_god")
    .select("id, name, language, meaning, related_names");

  if (error) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <p className="text-red-500">Failed to load data.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Relationship Map</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Explore the connections between divine names across cultures. Click on
        any node to view its details. Drag to reposition nodes, scroll to zoom.
      </p>

      <RelationshipGraph names={names || []} height={700} />
    </main>
  );
}
