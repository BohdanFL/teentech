import Courses from "../models/coursesModel.js";

export const getCourses = async (req, res) => {
  try {
    console.lo
    const { search: searchQuery, price, tags, difficulty } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const courses = await Courses.search(searchQuery);

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};
