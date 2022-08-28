import { Link } from "react-router-dom";

const Today = ({ tasks, overdue }) => {
  return (
    <div className='today-project-card'>
      <div className='today-icon-link'>
        <i id="calendar" className="fa fa-calendar" />
        <Link className='project-link' to='/projects'>Today</Link>
      </div>
      <div className={`task-length-${tasks.length === 0 && overdue.length === 0 ? 'empty' : 'populated'}`}>
        <p>{tasks.length + overdue.length}</p>
      </div>
    </div>
  )
}

export default Today;
