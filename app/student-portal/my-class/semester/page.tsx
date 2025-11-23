import Link from "next/link";

export default function Page({ searchParams }: { searchParams?: { sem?: string } }) {
	const sem = searchParams?.sem || "1";

	const items = [
		{ key: "scheme", title: "Scheme", desc: "View scheme for this semester", href: `/student-portal/my-class/semester/scheme?sem=${sem}` },
		{ key: "syllabus", title: "Syllabus", desc: "Download or view syllabus", href: `/student-portal/my-class/semester/syllabus?sem=${sem}` },
		{ key: "course-registration", title: "Course Registration", desc: "Register for courses", href: `/student-portal/my-class/semester/course-registration?sem=${sem}` },
		{ key: "course-withdraw", title: "Course Withdraw", desc: "Withdraw from a registered course", href: `/student-portal/my-class/semester/course-withdraw?sem=${sem}` },
		{ key: "course-drop", title: "Course Drop", desc: "Drop a course from your schedule", href: `/student-portal/my-class/semester/course-drop?sem=${sem}` },
		{ key: "exam-registration", title: "Exam Registration", desc: "Register for semester exams", href: `/student-portal/my-class/semester/exam-registration?sem=${sem}` },
		{ key: "results", title: "Results", desc: "View course results for this semester", href: `/student-portal/view-result?sem=${sem}` },
	];

	return (
		<main className="p-6">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Semester {sem} Dashboard</h1>
				<p className="text-sm text-muted-foreground">Quick access to semester actions and documents.</p>
			</header>

			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{items.map((it) => (
					<Link key={it.key} href={it.href} className="block rounded-lg border p-4 hover:shadow-lg transition-shadow">
						<div className="flex items-start gap-3">
							<div className="w-12 h-12 flex-none rounded-md bg-slate-100 flex items-center justify-center">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 7H20" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M4 12H20" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M4 17H14" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>

							<div>
								<h3 className="text-lg font-medium">{it.title}</h3>
								<p className="text-sm text-muted-foreground">{it.desc}</p>
							</div>
						</div>
					</Link>
				))}
			</section>

			<section className="mt-6 text-sm text-muted-foreground">
				<p>
					These links are placeholders. I can create the corresponding subpages or implement modal flows
					for each action (registration, withdraw, drop, exam reg.). Tell me which ones you'd like built
					next.
				</p>
			</section>
		</main>
	);
}
