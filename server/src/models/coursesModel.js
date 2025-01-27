import supabase from "../config/supabaseClient.js";

class Courses {
  static query;

  static async getData() {
    const { data, error } = await this.query;

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  static select(queryParams = "*") {
    this.query = supabase.from("courses").select(queryParams);
    return this.query;
  }

  static search(searchQuery) {
    console.log(searchQuery);
    if (searchQuery) {
      this.query = supabase.rpc("search_courses", {
        search_query: searchQuery,
      });
    }
    return this.query;
  }

  static async searchData(searchQuery) {
    let { data, error } = await this.search(searchQuery);

    if (error) throw new Error(error.message);
    return data;
  }

  static filter(level, price, tags) {
    if (!this.query) {
      throw new Error("Query not exist");
    }

    if (level) {
      this.filterByLevel(level);
    }
    if (price) {
      this.filterByPrice(price);
    }
    if (tags) {
      this.filterByTags(tags);
    }
    return this.query;
  }

  static filterByLevel(level) {
    this.query = this.query.eq("level", level);
    return this.query;
  }

  static filterByPrice(price) {
    this.query = this.query.eq("price_label", price);
    return this.query;
  }

  static filterByTags(tags) {
    const tagsArr = tags.split(",");
    const tagsQuery = tagsArr.map((tag) => `tags_text.cs.{${tag}}`).join(",");
    this.query = this.query.or(tagsQuery);
    return this.query;
  }
}

export default Courses;
