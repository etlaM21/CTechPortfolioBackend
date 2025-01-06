'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import data from "../../api/data.json";
const P5SketchLoader = dynamic(() => import('../../_components/P5SketchLoader'), { ssr: false });
const ThreeSceneLoader = dynamic(() => import('../../_components/ThreeSceneLoader'), { ssr: false });

export default function Project() {
    const params = useParams<{ id: string }>();
    const projectID = Number(params.id);

    const [mySketch, setMySketch] = useState(null);
    const [myScene, setMyScene] = useState(null);

    useEffect(() => {
        if (data.projects[projectID]?.p5) {
            const sketchPath = data.projects[projectID].p5;
            import(`../../_p5/${sketchPath}`)
                .then((module) => {
                    setMySketch(() => module.default);
                })
                .catch((error) => {
                    console.error('Error loading sketch:', error);
                });
        }
        if (data.projects[projectID]?.three) {
            const scenePath = data.projects[projectID].three;
            import(`../../_three/${scenePath}`)
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
