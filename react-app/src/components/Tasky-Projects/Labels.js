import { Link } from "react-router-dom"

const Labels = () => {
  return (
    <div className="labels-card">
      <div className="labels-icon-link">
        <i id="label" className="fa fa-tags" />
        <Link className="project-link" to='/projects/labels'>Labels</Link>
      </div>
    </div>
  )
}

export default Labels;
