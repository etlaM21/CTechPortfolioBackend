import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5SketchLoader = ({ sketch }) => {
  const sketchRef = useRef();

  useEffect(() => {
    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove(); // Cleanup p5 instance on component unmount
    };
  }, [sketch]);

  return <div ref={sketchRef} className="p5Sketch" />;
};

export default P5SketchLoader;
