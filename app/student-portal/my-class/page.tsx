//this will be the dashboard ( sem1 , sem2 ,etc...)







// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowLeft, BookOpen, Mail, User } from "lucide-react"

// export default function MyClassPage() {
//   const router = useRouter()
//   const [subjects] = useState([
import Link from "next/link";

export default function MyClassPage() {
	const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

	return (
		<main className="p-6">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">My Class</h1>
				<p className="text-sm text-muted-foreground">Select a semester to view dashboard and actions.</p>
			</header>

			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				{semesters.map((s, idx) => (
					<Link
						key={s}
						href={`/student-portal/my-class/semester?sem=${idx + 1}`}
						className="block rounded-lg border p-4 hover:shadow-lg transition-shadow"
					>
						<h3 className="text-lg font-medium">{s}</h3>
						<p className="text-sm text-muted-foreground mt-1">Open {s} dashboard</p>
					</Link>
				))}
			</section>
		</main>
	);
}
//       semester: "3",
