import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSections } from "../../store/sections";
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
            {showForm && (
              <EditSectionForm setShowForm={setShowForm} section={section} />
            )}
            {!showForm && (
              <div className="section-card">
                <div className="section-header" onClick={(e) => {
                  e.preventDefault();
                  setShowForm(true)
                }}>{section.name}</div>
                <TaskList userId={userId} sectionId={section.id} projectId={projectId} />
                <TaskForm sectionId={section.id} />
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
