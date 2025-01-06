import data from "./api/data.json";
import Link from 'next/link';

export default function Home() {
  return (
      <main>
        <div className="projectGallery">
          {data.projects.map(project =>(
            <Link href={`/project/${project.id}`} key={project.id}>
              <div className="projectCard" key={project.id}>
                <img src={project.img} />
                <h1>{project.title}</h1>
              </div>
            </Link>
          ))}
        </div>
    </main>
  );
}
