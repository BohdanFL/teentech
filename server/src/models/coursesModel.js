import supabase from "../config/supabaseClient.js";

class Courses {
  static query;

  static async getData() {
    const { data, error } = await this.query;
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(courseId, selectParams = "*") {
    this.query = this.query.eq("id", courseId);
    return await this.getData();
  }

  static select(selectParams = "*") {
    this.query = supabase.from("courses").select(selectParams);
    return this;
  }

  static range(offset, limit, queryParams = "*") {
    this.query = this.query.range(offset, offset + limit - 1);
    return this;
  }

  static search(searchQuery) {
    if (searchQuery) {
      this.query = supabase
        .rpc("search_courses", {
          search_query: searchQuery,
        })
        .select("id, title");
    }
    return this;
  }
}

export default Courses;
