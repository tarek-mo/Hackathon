import CardsStats from "@/components/cards-stats";
import InputTabs from "@/components/input-tabs";
import RecentlyCheckedTable from "@/components/recently-checked-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const obj = await supabase.auth.getUser();
  return (
    <div className="container">
      <main className="py-5 text-center">
        <h1 className="text-5xl">PhishGuard</h1>
        <p className="mt-3">PhishGuard is a phishing detection tool.</p>
      </main>
      <InputTabs userId={obj.data.user?.id} />
      <CardsStats />
      <RecentlyCheckedTable />
    </div>
  );
}
