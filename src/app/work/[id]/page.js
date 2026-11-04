import { notFound } from "next/navigation";
import ProjectCase from "../../../components/ProjectCase";
import {
  featuredProjects,
  getProject,
  getProjectCase,
} from "../../../data/projects";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.summary || project.blurb,
  };
}

export default async function WorkProjectPage({ params }) {
  const { id } = await params;
  const raw = getProject(id);
  if (!raw || !raw.featured) notFound();

  const project = getProjectCase(raw);
  return <ProjectCase project={project} />;
}
