import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSections } from "../../store/sections";

const Section = ({ userId, projects }) => {
  const projectId = +useParams().projectId;
  const dispatch = useDispatch();
  console.log("PROJECTID:: ", projectId);

  const sections = useSelector(state => Object.values(state.sections));

  useEffect(() => {
    dispatch(getSections(projectId))
  }, [dispatch, projectId])

  return (
    <>
      Hello!
    </>
  )
};

export default Section;
