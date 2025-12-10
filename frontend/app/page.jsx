"use client"

import { useState } from "react"
import Header from "@/components/header"
import AddTaskForm from "@/components/add-task-form"
import TaskList from "@/components/task-list"
import FilterBar from "@/components/filter-bar"
import EditModal from "@/components/edit-modal"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("dueDate")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setTasks([newTask, ...tasks])
    setShowAddForm(false)
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditingTask(null)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "dueDate") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    if (sort === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header onAddTask={() => setShowAddForm(true)} />

        {showAddForm && (
          <div className="mb-8 animate-in fade-in duration-300">
            <AddTaskForm onAdd={addTask} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        <div className="space-y-6">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            taskCount={filteredTasks.length}
          />

          <TaskList
            tasks={sortedTasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />

          {editingTask && <EditModal task={editingTask} onSave={updateTask} onClose={() => setEditingTask(null)} />}

          {tasks.length === 0 && !showAddForm && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
              <p className="text-muted-foreground">Create a task to get started and boost your productivity</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
