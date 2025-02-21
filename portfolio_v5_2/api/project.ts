import { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";

/*
export default function handler(req: VercelRequest, res: VercelResponse) {
  const projects = [
    { id: 1, name: "Vite App", description: "A simple Vite project" },
    { id: 2, name: "Three.js Scene", description: "A cool 3D visualization" },
    { id: 3, name: "Next.js Portfolio", description: "A personal portfolio" },
  ];

  return res.status(200).json(projects);
} */

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
      
        try {
          if (id) {
            // Fetch a single project by ID
            const project = await prisma.project.findUnique({
              where: { id: Number(id) },
            });
      
            if (!project) {
              return res.status(404).json({ error: "Project not found" });
            }
      
            return res.status(200).json(project);
          }
      
          // If no ID is provided, return all projects
          const projects = await prisma.project.findMany();
          return res.status(200).json(projects);
        } catch (error) {
          console.error("Database error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === 'POST') {
        try {
            const { title, content, img, date, p5, three } = req.body;

            // Create a new project using Prisma
            const newProject = await prisma.project.create({
                data: {
                    title,
                    content,
                    img,
                    date,
                    p5,
                    three,
                },
            });

            res.status(201).json(newProject); // Respond with the newly created project
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create project' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;  // Get the project ID from the query params
        const { title, content, img, date, p5, three } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Project ID is required' });
        }

        try {
            // Update the project with the provided data
            const updatedProject = await prisma.project.update({
                where: { id: Number(id) },
                data: {
                    title,
                    content,
                    img,
                    date,
                    p5,
                    three,
                },
            });

            res.status(200).json(updatedProject); // Respond with the updated project
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update project' });
        }
    } else {
        // If the method is neither GET nor POST, respond with a 405 Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}