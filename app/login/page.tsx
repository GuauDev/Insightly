import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BackIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	const logIn = async (formData: FormData) => {
		"use server";

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect("/");
	};

	const signUp = async (formData: FormData) => {
		"use server";

		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect("/login?message=Check email to continue sign in process");
	};

	return (
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center  gap-2">
			<Link
				href="/"
				className="absolute left-8 top-8 py-2 px-4 flex duration-300 bg-gray-950/20 rounded-2xl gap-3 hover:bg-gray-950/10"
			>
				<BackIcon />
				Back
			</Link>

			<form
				className="animate-in flex-1 flex flex-col w-full justify-center gap-3 text-foreground"
				action={logIn}
			>
				<Label className="text-md" htmlFor="email">
					Email
				</Label>
				<Input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<Label className="text-md" htmlFor="password">
					Password
				</Label>
				<Input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<Button variant="outline">Sign In</Button>
				<Button formAction={signUp} className=" rounded-md px-4 py-2  mb-2">
					Sign Up
				</Button>
				{searchParams?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	);
}
