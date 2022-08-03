import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSections } from "../../store/sections";
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
            <TaskList sectionId={section.id} />
          </div>
          <TaskForm sectionId={section.id} />
        </div>
      ))}
    </div>
  )
};

export default Section;
