import { useState } from "react";
import { Button } from "./ui/button";

const SlideViewer = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return <div>No slides available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{slides[currentSlide].title}</h2>
      <p>{slides[currentSlide].content}</p>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default SlideViewer;