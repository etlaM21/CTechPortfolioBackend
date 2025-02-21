'use server'

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../_data/projects.json";
import prisma from "../../lib/prisma"


const Home = () => {
    // let project = prisma.project.findMany();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchProjects() {
        try {
          const response = await fetch("api/project"); // Fetch from your Vercel API
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchProjects();
    }, []);

    return (
        <div className="projectGallery">
          {loading ? (
            <p>Loading Projects...</p>
            ) : (
                projects.map(p =>(

                <NavLink to={`/project/${p.id}`} key={p.id}>

                  <div className="projectCard" key={p.id}>

                    <img src={p.img} />
                    <h1>{p.title}</h1>
                  </div>

                </NavLink>

                ))
            )
          }
          
        </div>
    );
}

export default Home;





