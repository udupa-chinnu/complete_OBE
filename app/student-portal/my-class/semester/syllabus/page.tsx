export default function SyllabusPage({ searchParams }: { searchParams?: { sem?: string } }) {
  const sem = searchParams?.sem || "1";

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Syllabus — Semester {sem}</h1>
      <p className="text-sm text-muted-foreground">Syllabus PDF links and topics list will be shown here.</p>
    </main>
  );
}
