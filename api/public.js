export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseData = req.body;
    return res.status(200).json({
        error: false,
        title: "Test",
        message: supabaseData
    });

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
    // let userResponse = await supabaseRes.json();

  }
  //  else if (req.method === "GET") {
  //   } else {
  //   }
  return res.status(405).json({
    error: true,
    title: "Invalid API call.",
    message: "Something went wrong.",
  });
}
