import { useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "./NotFound";
import ProjectDeleteModal from "./ProjectDeleteModal";
import ProjectEditModal from "./ProjectEditModal";
import Section from "./Section";

const ProjectView = ({ userId, projects }) => {
  const projectId = +useParams().projectId;

  const project = projects.find(project => project.id === projectId);

  const projectParams = projects.map(project => project.id);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (projectParams.includes(projectId)) {
    return (
      <>
        {showEdit && <ProjectEditModal project={project} setShowEdit={setShowEdit} />}
        {showDelete && <ProjectDeleteModal project={project} setShowDelete={setShowDelete} />}
        <div className="project-view">
          <div className="project-header-bar">
            <div id={`color-label-${project.color_label.split(' ')[0].toLowerCase()}`} />
            <h2 className="project-heading">{project?.name}</h2>
            <button id="pencil" className="fa fa-pencil-square-o" onClick={() => setShowEdit(true)}></button>
            {!project.is_default && (
              <button id="trash" className="fa fa-trash-o" onClick={() => setShowDelete(true)}></button>
            )}
          </div>
          <Section userId={userId} projectId={projectId} />
          <div className="side-padding"></div>
        </div>
      </>
    )
  } else {
    return (
      <NotFound />
    )
  }
}

export default ProjectView;
