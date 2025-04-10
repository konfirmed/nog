'use client';
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
    const allNames = [
        { id: '1', name: 'Olúwa', language: 'yoruba', meaning: 'Lord / Master' },
        { id: '2', name: 'אלהים', language: 'hebrew', meaning: 'God / Deity' },
        { id: '3', name: '上帝', language: 'mandarin', meaning: 'Supreme Deity' }
    ];
    
    const [language, setLanguage] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    
    const filtered = allNames.filter(n => {
        const matchesLanguage = language ? n.language === language : true;
        const matchesQuery = [n.name, n.meaning, n.language].some(val =>
          val.toLowerCase().includes(query.toLowerCase())
        );
        return matchesLanguage && matchesQuery;
    });

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                <InfoIcon size="16" strokeWidth={2} />
                Welcome back, {user.user_metadata.full_name || user.email}!
                </div>
            </div>
            <div className="bg-accent p-6 rounded-md">
                <h1 className="text-3xl font-bold mb-2">Names of God</h1>
            {/* Add names of GOD from supabase */}
            <h1 className="text-3xl font-bold mb-4">Names of God Across Cultures</h1>

            <input
                type="text"
                placeholder="Search by name, meaning, or language..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm"
            />

            <div className="mb-6 flex gap-2">
                {['yoruba', 'hebrew', 'mandarin'].map((lang) => (
                <button
                    key={lang}
                    className={`px-3 py-1 rounded-full border ${language === lang ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => setLanguage(language === lang ? null : lang)}
                >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((n) => (
                <NameCard key={n.id} name={n.name} id={n.id} language={n.language} meaning={n.meaning} />
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-sm text-gray-500 mt-6">No names match your search.</p>
            )}
            </div>
        </div>
    );
}


function NameCard({ id, name, language, meaning }: any) {
  return (
    <Link href={`/names/${id}`} className="block p-4 border rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">Language: {language}</p>
      <p className="text-sm italic">Meaning: {meaning}</p>
    </Link>
  );
}