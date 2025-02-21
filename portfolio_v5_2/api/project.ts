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