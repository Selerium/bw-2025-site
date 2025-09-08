import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await fetch(
      "https://afqmzmqsvbxdyxuqhwfv.supabase.co/functions/v1/register-user",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    )

    const data = await response.json()

    return res.status(response.status).json(data)
}


// const supabaseRes = await fetch(
//   "https://afqmzmqsvbxdyxuqhwfv.supabase.co/functions/v1/register-user",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: supabaseData,
//   }
// );
// return supabaseRes;
  //  else if (req.method === "GET") {
  //   } else {
  //   }
  return res.status(405).json({
    error: true,
    title: "Invalid API call.",
    message: "Something went wrong.",
  });
}
