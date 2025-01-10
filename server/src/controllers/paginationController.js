import supabase from "../config/supabaseClient.js";

export const displayCourses = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;

  try {
    const { data, error: dataError } = await supabase
      .from("courses")
      .select("*")
      .range(offset, offset + limit - 1);

    if (dataError) throw new Error(`Data fetch error: ${dataError.message}`);

    const { count, error: countError } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true });

    if (countError) throw new Error(`Count fetch error: ${countError.message}`);

    const totalPages = Math.ceil(count / limit);

    res.json({
      data,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "An error occured. " });
  }
};
