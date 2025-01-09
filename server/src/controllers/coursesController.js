import Courses from "../models/coursesModel.js";

export const getCourses = async (req, res) => {
  const { price, tags, level, search: searchQuery } = req.query;
  try {
    let coursesQuery = Courses.select();

    if (searchQuery) {
      coursesQuery = Courses.search(searchQuery);
    }
    if (price || tags || level) {
      coursesQuery = Courses.filter(level, price, tags);
    }

    const { data: courses, error } = await coursesQuery;

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};
