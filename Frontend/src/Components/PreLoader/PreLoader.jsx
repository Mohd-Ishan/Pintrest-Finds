import React, { useEffect, useState } from "react";
import "./PreLoader.css";

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // speed: 25ms → ~2.5 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`preloader ${progress === 100 ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <h1 className="preloader-number">{progress}%</h1>
        <div className="preloader-bar">
          <div
            className="preloader-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="preloader-text">Loading your experience...</p>
        <p className="little-intro">Pintrest Finds -- <br /> we create and find that outfits. <br /> Which are famous and popluer.</p>
      </div>
    </div>
  );
};

export default Preloader;
