import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import data from "../_data/projects.json";
// const P5SketchLoader = dynamic(() => import('./loader/P5SketchLoader'), { ssr: false });
import P5SketchLoader from "../loader/P5SketchLoader.jsx";
import ThreeSceneLoader from "../loader/ThreeSceneLoader.jsx";

const Project = () => {
    const params = useParams();
    const projectID = Number(params.id);

    const [mySketch, setMySketch] = useState(null);
    const [myScene, setMyScene] = useState(null);

    useEffect(() => {
        if (data.projects[projectID]?.p5) {
            const sketchPath = data.projects[projectID].p5;
            // console.log(sketchPath);
            
            import(`../_data/p5/${sketchPath}`)
                .then((module) => {
                    setMySketch(() => module.default);
                })
                .catch((error) => {
                    console.error('Error loading sketch:', error);
                });
        }
        if (data.projects[projectID]?.three) {
            const scenePath = data.projects[projectID].three;
            import(`../_data/three/${scenePath}`)
            .then((module) => {
                setMyScene(() => module.default);
            })
            .catch((error) => console.error('Error loading scene:', error));
        }
    }, [projectID]);

    

    return (
        <main>
            <div className="project" key={data.projects[projectID].id}>
                <img src={data.projects[projectID].img} />
                <h4>{data.projects[projectID].date}</h4>
                <h1>{data.projects[projectID].title}</h1>
                <p>{data.projects[projectID].content}</p>

                {mySketch && <P5SketchLoader sketch={mySketch} />}
                {myScene && <ThreeSceneLoader threeScene={myScene} />}
            </div>
        </main>
    );
}


export default Project;
