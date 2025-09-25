const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    let { data, error } = await supabase
      .from("registrations-25")
      .select("full_name")
      .neq("role", "leader")
      .order("created_at");
    return res.status(200).json(data);
  }
  return res.status(405).json({
    error: true,
    title: "Invalid API call.",
    message: "Something went wrong.",
  });
}
