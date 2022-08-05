import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSections } from "../../store/sections";
import SectionForm from "../Forms/SectionForm";
import TaskForm from "../Forms/TaskForm";
import TaskList from "./Tasks";

const Section = ({ userId, projects }) => {
  const projectId = +useParams().projectId;
  const dispatch = useDispatch();

  const sections = useSelector(state => Object.values(state.sections))
    .filter(section => section.project_id === projectId)

  useEffect(() => {
    dispatch(getSections(projectId))
  }, [dispatch, projectId])

  return (
    <div className="section">
      {sections.map(section => (
        <div key={section.id}>
          <div className="section-card">
            {section.name}
            <TaskList userId={userId} sectionId={section.id} projectId={projectId} />
          </div>
          <TaskForm sectionId={section.id} />
        </div>
      ))}
      <SectionForm projectId={projectId} />
    </div>
  )
};

export default Section;
