import { useState, useEffect } from "react";
import { getTasks } from "../api/tasksApi";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header.jsx";

function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = () => {
    setShowAddForm(false);
    loadTasks();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header onAddTask={() => setShowAddForm(true)} />

      {showAddForm && (
        <div className="mb-8">
          <AddTaskForm onTaskAdded={handleTaskAdded} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <FilterBar setFilter={setFilter} setSort={setSort} />

      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">Use Add Task to create your first task</p>
        </div>
      ) : (
        <TaskList
          filter={filter}
          sort={sort}
          tasks={tasks}
          onTaskChanged={handleTaskAdded}
        />
      )}
    </div>
  );
}

export default Home;
