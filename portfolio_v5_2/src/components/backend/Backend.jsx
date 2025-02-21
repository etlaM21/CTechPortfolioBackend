import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateProjectForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [date, setDate] = useState('');
    const [p5, setP5] = useState('');
    const [three, setThree] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const projectData = {
            title,
            content,
            img,
            date,
            p5,
            three,
        };

        try {
            const response = await fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const data = await response.json();
            console.log('Project created:', data);

            // Reset form fields
            setTitle('');
            setContent('');
            setImg('');
            setDate('');
            setP5('');
            setThree('');
        } catch (error) {
            console.error(error);
            setError('An error occurred while creating the project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="P5 Sketch (filename)"
                value={p5}
                onChange={(e) => setP5(e.target.value)}
            />
            <input
                type="text"
                placeholder="Three.js Scene (filename)"
                value={three}
                onChange={(e) => setThree(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

const Backend = () => {
    // let project = prisma.project.findMany();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchProjects() {
        try {
          const response = await fetch("../../api/project"); // Fetch from your Vercel API
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchProjects();
    }, [projects]);
    
    return (
        <div className="backend">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Create New Project</h2>
                    <CreateProjectForm />
                    
                    <div>
                        <h2>Update Existing Projects</h2>
                            <div className="updateProjectGrid">
                            {projects.map((p) => (
                                <NavLink to={`/backend/update/${p.id}`} key={p.id}>
                                    <div>{p.title}</div>
                                </NavLink>
                            ))}
                            </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Backend;