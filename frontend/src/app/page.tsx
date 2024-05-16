import CardsStats from "@/components/cards-stats";
import InputTabs from "@/components/input-tabs";
import RecentlyCheckedTable from "@/components/recently-checked-table";

export default function Home() {
  return (
    <div className="container">
      <main className="py-5 text-center">
        <h1 className="text-5xl">PhishGuard</h1>
        <p className="mt-3">PhishGuard is a phishing detection tool.</p>
      </main>
      <InputTabs />
      <CardsStats />
      <RecentlyCheckedTable />
    </div>
  );
}
