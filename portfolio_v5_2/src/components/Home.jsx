import { NavLink } from "react-router-dom";
import data from "../_data/projects.json";


const Home = () => {
    return (
        <div className="projectGallery">

          {data.projects.map(p =>(

            <NavLink to={`/project/${p.id}`} key={p.id}>

              <div className="projectCard" key={p.id}>

                <img src={p.img} />
                <h1>{p.title}</h1>
              </div>

            </NavLink>

          ))}
        </div>
    );
}

export default Home;





