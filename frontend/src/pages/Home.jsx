import { useState, useEffect } from "react"
import { toast } from "sonner"
import { getTasks } from "../api/tasksApi"
import TaskList from "../components/TaskList"
import AddTaskForm from "../components/AddTaskForm"
import FilterBar from "../components/FilterBar"
import Header from "../components/Header.jsx"

function Home() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("")
  const [tasks, setTasks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await getTasks()
      setTasks(res.data || [])
    } catch (err) {
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleTaskAdded = () => {
    setShowAddForm(false)
    loadTasks()
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const progressPct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Header onAddTask={() => setShowAddForm(true)} />

      {showAddForm && (
        <div className="mb-8">
          <AddTaskForm onTaskAdded={handleTaskAdded} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="text-sm text-muted-foreground">
            Completed {completedCount} of {totalCount}
          </div>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        setSort={setSort}
        taskCount={tasks.length}
        query={query}
        setQuery={setQuery}
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="size-8 border-2 border-muted-foreground/50 border-t-primary rounded-full animate-spin" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">Use Add Task to create your first task</p>
          <div className="mt-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="interactive px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Create Task
            </button>
          </div>
        </div>
      ) : (
        <TaskList
          filter={filter}
          sort={sort}
          tasks={tasks}
          query={query}
          onTaskChanged={handleTaskAdded}
        />
      )}
    </div>
  );
}

export default Home;
