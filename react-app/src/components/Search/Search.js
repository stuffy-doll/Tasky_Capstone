import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserTasks } from "../../store/tasks";

const Search = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState([])

  const userId = useSelector(state => state.session.user.id)
  const tasks = useSelector(state => Object.values(state.tasks))
  let results = [];
  console.log("SEARCH TASKS:: ", tasks)
  console.log("SEARCH:: ", search);

  useEffect(() => {
    dispatch(getUserTasks(userId))
  }, [dispatch, userId])

  const filterTasks = (e) => {
    if (e.target.value) {
      results = tasks.filter(task =>
        (!task.is_complete && task.title.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    };
    setSearch(results)
  }

  return (
    <div className="search-container">
      <div className="search-bar-view">
        <div className="search-bar">
          <i id="search" className="fa fa-search" />
          <input
            className="search-tasks"
            type="text"
            placeholder="Search tasks..."
            onChange={filterTasks} />
        </div>
      </div>
      <div className="results-container">
        {search.map(result => (
          <Link
            key={result.id} to={`/projects/${result.project_id}/task/${result.id}`}
            onClick={() => setSearch([])}>
            <div className="single-result">
              <p className="result title">{result.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
