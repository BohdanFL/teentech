import supabase from "../config/supabaseClient.js";

class Courses {
  static async search(searchQuery) {
    let { data, error } = await supabase.rpc("search_courses", {
      search_query: searchQuery,
    });

    if (error) throw new Error(error.message);
    return data;
  }
}

export default Courses;
