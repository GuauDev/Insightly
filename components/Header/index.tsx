import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Component() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	return (
		<header className="flex justify-between p-6 items-center h-20 ">
			<h1 className="font-bold text-2xl">Insightly</h1>
			{!data ? (
				<div>
					<Button variant="outline">Sign Up</Button>
					<Button>Sign In</Button>
				</div>
			) : (
				<div>
					<p>{data?.user?.email}</p>
				</div>
			)}
		</header>
	);
}
