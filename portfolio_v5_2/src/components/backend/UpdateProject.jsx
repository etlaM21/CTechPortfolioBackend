import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProjectForm = () => {
    const { id } = useParams(); // Get the project ID from the URL
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        img: '',
        date: '',
        p5: '',
        three: ''
    });
    useEffect(() => {
        // Fetch the project data when the component mounts
        async function fetchProject() {
            try {
                const response = await fetch(`/api/project?id=${id}`);
                const data = await response.json();
                setProject(data);
                setFormData(data); // Populate the form with the fetched project data
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        }

        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/project?id=${id}`, {
                method: 'PUT', // Change to PUT for updating the entire project
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const updatedProject = await response.json();
            console.log('Project updated:', updatedProject);
        } catch (error) {
            console.error(error);
            setError('An error occurred while updating the project.');
        } finally {
            setLoading(false);
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <div className="backend">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="img"
                    placeholder="Image URL"
                    value={formData.img}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="p5"
                    placeholder="P5 Sketch (filename)"
                    value={formData.p5}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="three"
                    placeholder="Three.js Scene (filename)"
                    value={formData.three}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Project'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default UpdateProjectForm;
