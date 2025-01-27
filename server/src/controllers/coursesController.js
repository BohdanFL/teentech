import Courses from "../models/coursesModel.js";

export const getCoursesByQuery = async (req, res) => {
  const { search: searchQuery, page: pageQuery, limit: limitQuery } = req.query;
  const page = Math.max(1, parseInt(pageQuery) || 1);
  const limit = Math.max(1, parseInt(limitQuery) || 10);
  const offset = (page - 1) * limit;

  try {
    const courses = await Courses.select("*")
      .range(offset, limit)
      .search(searchQuery)
      .getData();

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Courses.select("*").getById(courseId);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};
