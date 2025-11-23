type ResultRow = {
	id: number;
	course: string;
	code: string;
	cie: [number, number, number];
	total: number;
};

const sampleResults: ResultRow[] = [
	{ id: 1, course: "Data Structures", code: "CS201", cie: [18, 20, 17], total: 55 },
	{ id: 2, course: "Web Development", code: "CS202", cie: [16, 15, 18], total: 49 },
	{ id: 3, course: "Database Systems", code: "CS203", cie: [12, 14, 13], total: 39 },
	{ id: 4, course: "Computer Networks", code: "CS204", cie: [20, 19, 18], total: 57 },
	{ id: 5, course: "Operating Systems", code: "CS205", cie: [14, 16, 15], total: 45 },
];

function EligibilityBadge({ total }: { total: number }) {
	const eligible = total >= 40;
	return (
		<span
			className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
				eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
			}`}
		>
			{eligible ? "Eligible" : "Not Eligible"}
		</span>
	);
}

export default function Page() {
	return (
		<main className="p-6">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Results</h1>
				<p className="text-sm text-muted-foreground">Course results (CIE breakdown and eligibility)</p>
			</header>

			<div className="overflow-x-auto">
				<table className="w-full table-auto border-collapse">
					<thead>
						<tr className="text-left text-sm text-muted-foreground">
							<th className="px-4 py-2">Course Name</th>
							<th className="px-4 py-2">Code</th>
							<th className="px-4 py-2">CIE 1</th>
							<th className="px-4 py-2">CIE 2</th>
							<th className="px-4 py-2">CIE 3</th>
							<th className="px-4 py-2">Total</th>
							<th className="px-4 py-2">Eligibility</th>
						</tr>
					</thead>
					<tbody>
						{sampleResults.map((r) => (
							<tr key={r.id} className="border-t">
								<td className="px-4 py-3">{r.course}</td>
								<td className="px-4 py-3">{r.code}</td>
								<td className="px-4 py-3">{r.cie[0]}</td>
								<td className="px-4 py-3">{r.cie[1]}</td>
								<td className="px-4 py-3">{r.cie[2]}</td>
								<td className="px-4 py-3 font-semibold">{r.total}</td>
								<td className="px-4 py-3">
									<EligibilityBadge total={r.total} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<section className="mt-6 text-sm text-muted-foreground">
				<p>Notes: Totals and eligibility here are sample values. I can wire this to real data or add export/print features.</p>
			</section>
		</main>
	);
}
