import Courses from "../models/coursesModel.js";

export const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const courses = await Courses.search(query);

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};
