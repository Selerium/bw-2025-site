import supabase from '../src/lib/supabaseClient';

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
