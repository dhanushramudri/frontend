import { Button } from "../components/ui/button";
import imagecard from "../assets/imagecard.avif";

// Mock data for courses
const courses = [
  { id: 1, title: "Introduction to React", description: "Learn the basics of React and build your first application." },
  { id: 2, title: "Advanced JavaScript", description: "Deep dive into advanced JavaScript concepts and techniques." },
  { id: 3, title: "Node.js for Beginners", description: "Get started with Node.js and build scalable backend applications." },
  { id: 4, title: "CSS Masterclass", description: "Master CSS and create stunning web designs." },
  { id: 6, title: "Introduction to React", description: "Learn the basics of React and build your first application." },
  { id: 7, title: "Advanced JavaScript", description: "Deep dive into advanced JavaScript concepts and techniques." },
  { id: 8, title: "Node.js for Beginners", description: "Get started with Node.js and build scalable backend applications." },
  { id: 9, title: "CSS Masterclass", description: "Master CSS and create stunning web designs." },
];

const Home = () => {
  return (
    <div className="lg:ml-72 ml-0 px-4 sm:px-6 md:px-8 mt-16">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center md:text-left text-gray-800">
        Welcome to the Training Platform
      </h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img src={imagecard} alt={course.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h2>
              <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
              <Button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                Enroll Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;