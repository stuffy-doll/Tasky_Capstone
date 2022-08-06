import { useState } from "react";
import { useParams } from "react-router-dom"
import ProjectDeleteModal from "./ProjectDeleteModal";
import ProjectEditModal from "./ProjectEditModal";
import Section from "./Section";

const ProjectView = ({ userId, projects }) => {
  const projectId = +useParams().projectId;
  console.log(useParams());

  const project = projects.find(project => project.id === projectId);

  const projectParams = projects.map(project => project.id);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (projectParams.includes(projectId)) {
    return (
      <div className="project-view">
        <div className="project-header bar">
          <h2 className="project-heading">{project?.name}</h2>
          <button className="project-edit" onClick={() => setShowEdit(true)}>Edit Project</button>
          <button className="project-delete" onClick={() => setShowDelete(true)}>Delete Project</button>
        </div>
        <Section userId={userId} projectId={projectId} />
        <div className="side-padding"></div>
        {showEdit && <ProjectEditModal project={project} setShowEdit={setShowEdit} />}
        {showDelete && <ProjectDeleteModal project={project} setShowDelete={setShowDelete} />}
      </div>
    )
  } else {
    return (
      <h1>404: Not Found</h1>
    )
  }

}

export default ProjectView;
