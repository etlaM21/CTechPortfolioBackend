import { useEffect, useRef } from 'react';

const ThreeSceneLoader = ({ threeScene }) => {
    const canvasRef = useRef();

    useEffect(() => {
        let cleanup;

        const loadScene = async () => {
            const scene = await threeScene(canvasRef.current);
            cleanup = scene(canvasRef.current); // Assume the scene file exports an `init` function
        };

        loadScene();

        return () => {
            if (cleanup) cleanup(); // Call the cleanup function if provided
        };
    }, [threeScene]);

    return <div className="threeScene"><canvas ref={canvasRef} width={document.getElementsByClassName("project")[0].clientWidth - 4} height={"596"} /></div>
};

export default ThreeSceneLoader;