// import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          {/* Welcome back, {user.user_metadata.full_name || user.email}! */}
        </div>
      </div>
      <div className="bg-accent p-6 rounded-md">
        <h1 className="text-3xl font-bold mb-2">Names of God</h1>
      {/* Add names of GOD from supabase */}

      </div>
    </div>
  );
}
