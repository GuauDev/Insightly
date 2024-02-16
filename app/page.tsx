import { createClient } from "@/utils/supabase/server";

export default async function Index() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	return <h1>Hi {data?.user?.email}</h1>;
}
