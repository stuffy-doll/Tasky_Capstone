import { useParams } from "react-router-dom"
import Section from "./Section";

const ProjectView = ({ userId, projects }) => {
  const projectId = +useParams().projectId;
  console.log(useParams());

  const project = projects.find(project => project.id === projectId);
  console.log(projects);
  console.log(project);

  return (
    <div className="project-view">
      <h2 className="project-heading">{project?.name}</h2>
      <Section userId={userId} projectId={projectId} />
      <div className="side-padding"></div>
    </div>
  )
}

export default ProjectView;
