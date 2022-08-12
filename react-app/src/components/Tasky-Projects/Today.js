import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Today = () => {
  // const dispatch = useDispatch();

  const dateFormatter = (date) => {
    if (date) {
      if (date.length === 10) {
        return date;
      } else {
        date = new Date(date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
      };
    } else {
      return;
    };
  };

  const today = dateFormatter(new Date(Date.now()))

  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => dateFormatter(task.due_date?.slice(0, -4)) === today)
    .filter(task => !task.is_complete);

  return (
    <div className='today-project-card'>
      <div className='today-icon-link'>
        <i id="calendar" className="fa fa-calendar" />
        <Link className='project-link' to='/projects'>Today</Link>
      </div>
      <div className={`task-length-${tasks.length === 0 ? 'empty' : 'populated'}`}>
        <p>{tasks.length}</p>
      </div>
    </div>
  )
}

export default Today;
