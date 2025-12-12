import TaskCard from "./TaskCard";

function TaskList({ filter, sort, tasks, query = "", onTaskChanged }) {

  // Filter logic
  let filteredTasks = tasks;
  if (filter === "pending") filteredTasks = tasks.filter(t => !t.completed);
  if (filter === "completed") filteredTasks = tasks.filter(t => t.completed);

  // Text search
  if (query) {
    const q = query.toLowerCase();
    filteredTasks = filteredTasks.filter(t =>
      (t.title || "").toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q)
    );
  }

  // Sort logic
  if (sort === "priority") {
    filteredTasks = filteredTasks.slice().sort(
      (a, b) => ["low", "medium", "high"].indexOf(a.priority) -
                ["low", "medium", "high"].indexOf(b.priority)
    );
  }
  if (sort === "dueDate") {
    filteredTasks = filteredTasks.slice().sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} onTaskChanged={onTaskChanged} />
      ))}
    </div>
  );
}

export default TaskList;
