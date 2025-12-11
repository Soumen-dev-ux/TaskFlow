import { useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");

  return (
    <div className="container mx-auto px-4">
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <AddTaskForm refresh={() => window.location.reload()} />

      {/* Filters */}
      <FilterBar setFilter={setFilter} setSort={setSort} />

      {/* Task List */}
      <TaskList filter={filter} sort={sort} />
    </div>
  );
}

export default Home;
