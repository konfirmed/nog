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
    <main className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Relationship Map</h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
        Explore connections between divine names across cultures.{" "}
        <span className="hidden sm:inline">
          Click on any node to view its details. Drag to reposition nodes, scroll to zoom.
        </span>
      </p>

      <RelationshipGraph names={names || []} height={600} />
    </main>
  );
}
