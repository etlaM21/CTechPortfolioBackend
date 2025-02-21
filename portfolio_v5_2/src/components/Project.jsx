import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import data from "../_data/projects.json";
// const P5SketchLoader = dynamic(() => import('./loader/P5SketchLoader'), { ssr: false });
import P5SketchLoader from "../loader/P5SketchLoader.jsx";
import ThreeSceneLoader from "../loader/ThreeSceneLoader.jsx";

const Project = () => {
    const params = useParams();
    const projectID = Number(params.id);

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [mySketch, setMySketch] = useState(null);
    const [myScene, setMyScene] = useState(null);

    // Use import.meta.glob to predefine the available modules
    const sketches = import.meta.glob('../_data/p5/*.js');
    const scenes = import.meta.glob('../_data/three/*.js');

    useEffect(() => {
      async function fetchProjects() {
        try {
            const response = await fetch(`/api/project?id=${projectID}`);
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
      }
      fetchProjects();
    }, [projectID]);

    useEffect(() => {
        if(project){
            console.log("loading p5 for project:", project);
            if (project.p5) {
                const sketchPath = `../_data/p5/${project.p5}`;
                const importer = sketches[sketchPath];
        
                if (importer) {
                    importer()
                        .then((module) => setMySketch(() => module.default))
                        .catch((error) => console.error('Error loading sketch:', error));
                } else {
                    console.error('Sketch file not found:', sketchPath);
                }
            }
        
            if (project.three) {
                const scenePath = `../_data/three/${project.three}`;
                const importer = scenes[scenePath];
        
                if (importer) {
                    importer()
                        .then((module) => setMyScene(() => module.default))
                        .catch((error) => console.error('Error loading scene:', error));
                } else {
                    console.error('Scene file not found:', scenePath);
                }
            }
        }
    }, [project, scenes, sketches]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <main>
            <div className="project" key={project.id}>
                <img src={project.img} alt={project.title} />
                <h4>{project.date}</h4>
                <h1>{project.title}</h1>
                <p>{project.content}</p>

                {mySketch && <P5SketchLoader sketch={mySketch} />}
                {myScene && <ThreeSceneLoader threeScene={myScene} />}
            </div>
        </main>
    );
}


export default Project;
