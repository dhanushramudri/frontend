import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/Textarea";

const AddContentForm = ({ courseId }) => {
  const [slideContent, setSlideContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");

  const handleAddSlide = async () => {
    // Call API to add slide
    console.log("Adding slide:", slideContent);
    // await addSlide(courseId, slideContent);
  };

  const handleAddVideo = async () => {
    // Call API to add video
    console.log("Adding video:", videoUrl);
    // await addVideo(courseId, videoUrl);
  };

  const handleAddQuiz = async () => {
    // Call API to add quiz
    console.log("Adding quiz:", quizQuestion);
    // await addQuiz(courseId, quizQuestion);
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Content</h2>

      {/* Add Slide */}
      <Textarea
        placeholder="Enter slide content"
        value={slideContent}
        onChange={(e) => setSlideContent(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleAddSlide} className="mb-4">
        Add Slide
      </Button>

      {/* Add Video */}
      <Input
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleAddVideo} className="mb-4">
        Add Video
      </Button>

      {/* Add Quiz */}
      <Input
        placeholder="Enter quiz question"
        value={quizQuestion}
        onChange={(e) => setQuizQuestion(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleAddQuiz}>Add Quiz</Button>
    </div>
  );
};

export default AddContentForm;