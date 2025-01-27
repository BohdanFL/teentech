import Courses from "../models/coursesModel.js";

export const getCourses = async (req, res) => {
  const { price, tags, level, search: searchQuery } = req.query;
  try {
    let coursesQuery = Courses.select();

    coursesQuery = Courses.search(searchQuery);
    coursesQuery = Courses.filter(level, price, tags);

    const courses = await Courses.getData();

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Courses not found", error: error.message });
  }
};
