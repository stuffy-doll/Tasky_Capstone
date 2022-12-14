import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSections, deleteSection } from "../../store/sections";
import { getUserTasks } from "../../store/tasks";
import EditSectionForm from "../Forms/EditSectionForm";
import SectionForm from "../Forms/SectionForm";
import TaskForm from "../Forms/TaskForm";
import TaskList from "./Tasks";

const Section = ({ userId, projectId }) => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const sections = useSelector(state => Object.values(state.sections))
    .filter(section => section.project_id === projectId)

  useEffect(() => {
    dispatch(getSections(projectId))
  }, [dispatch, projectId])

  return (
    <>
      <div className="section">
        {sections.map(section => (
          <div key={section.id}>
            {/* Render Edit Form outside of map */}
            {showForm && (
              <EditSectionForm setShowForm={setShowForm} section={section} />
            )}
            {!showForm && (
              <div className="section-card">
                <div className="section-header">{section.name}</div>
                <TaskForm sectionId={section.id} />
                <TaskList userId={userId} sectionId={section.id} projectId={projectId} />
                <button id="trash" className="fa fa-trash-o" onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(deleteSection(section.id))
                  await dispatch(getUserTasks(userId))
                }}></button>
              </div>
            )}
          </div >
        ))
        }
        <SectionForm projectId={projectId} />
      </div >
    </>
  )
};

export default Section;
