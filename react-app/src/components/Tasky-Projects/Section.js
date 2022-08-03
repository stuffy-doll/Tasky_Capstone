import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSections } from "../../store/sections";

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
        <div className="section-card" key={section.id}>
          {section.name}
        </div>
      ))}
    </div>
  )
};

export default Section;
