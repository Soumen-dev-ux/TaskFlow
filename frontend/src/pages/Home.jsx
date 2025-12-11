import { useState, useEffect } from "react";
import { fetchTasks, getTasks } from "../api/tasksApi";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";

function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = () => {
    loadTasks();
  };

  return (
    <div className="container mx-auto px-4">
      <AddTaskForm onTaskAdded={handleTaskAdded} />

      <FilterBar setFilter={setFilter} setSort={setSort} />

      <TaskList filter={filter} sort={sort} tasks={tasks} />
    </div>
  );
}

export default Home;
