import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userData = req.body;
    
    const { data, error } = await supabase.from('registrations').insert(userData);
    if (error) {
        return res.status(400).json({
            'error': true,
            'title': 'User not registered',
            'message': 'We were not able to process your request. Please try again later.',
            'data': error
        })
    }
    else {
        return res.status(200).json({
            'error': true,
            'title': 'User registered!',
            'message': 'Your details have been saved.',
            'data': error
        })
    }
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
