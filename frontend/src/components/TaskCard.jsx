import { deleteTask, updateTask, toggleComplete } from "../api/tasksApi";

function TaskCard({ task, refresh }) {

  const handleComplete = async () => {
    await toggleComplete(task._id, !task.completed);
    refresh();
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    refresh();
  };

  const handleEdit = async () => {
    const newTitle = prompt("Edit title:", task.title);
    if (newTitle) {
      await updateTask(task._id, { title: newTitle });
      refresh();
    }
  };

  return (
    <div className="interactive flex items-start gap-3 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      <input
        type="checkbox"
        className="size-5 mt-1 accent-primary cursor-pointer"
        checked={task.completed}
        onChange={handleComplete}
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-1">{task.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
        <small className="text-xs text-gray-500">Priority: {task.priority}</small><br/>
        <small className="text-xs text-gray-500">Due: {task.dueDate?.substring(0,10)}</small>
      </div>

      <div className="flex gap-2">
        <button onClick={handleEdit} className="interactive-soft px-3 py-1 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90">Edit</button>
        <button onClick={handleDelete} className="interactive-soft px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
