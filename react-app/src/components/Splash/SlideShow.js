import { useEffect, useRef, useState } from "react"

const SlideShow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    };
  };

  const slides = ["https://i.imgur.com/Ru2uErZ.png", "https://i.imgur.com/7SpQoBC.png", "https://i.imgur.com/ivHe5E8.png"]
  const delay = 5000;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() =>
      setIndex((prevIndex) => prevIndex === slides.length - 1 ? 0 : prevIndex + 1), delay);

    return () => {
      resetTimeout();
    };
  }, [index, slides.length]);

  return (
    <div className="slideshow">
      <div className="slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {slides.map((slide, idx) => (
          <img src={slide} className="slide" key={idx} alt='slide' />
        ))}
      </div>
      <div className="dots">
        {slides.map((_, idx) => (
          <div key={idx} className={`slideshow-dot${index === idx ? ' active' : ''}`} onClick={() => { setIndex(idx) }} />
        ))}
      </div>
    </div>
  )
};

export default SlideShow
