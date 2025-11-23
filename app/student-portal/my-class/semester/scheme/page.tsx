export default function SchemePage({ searchParams }: { searchParams?: { sem?: string } }) {
  const sem = searchParams?.sem || "1";

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Scheme — Semester {sem}</h1>
      <p className="text-sm text-muted-foreground">Scheme details and downloadable files will appear here.</p>
    </main>
  );
}
