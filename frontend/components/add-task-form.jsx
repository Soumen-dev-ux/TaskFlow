"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AddTaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title,
      description,
      priority,
      dueDate,
      completed: false,
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
  }

  return (
    <Card className="p-6 bg-card border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Task Title *</label>
          <Input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
          <textarea
            placeholder="Add task details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-input border-border text-foreground h-10"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            Add Task
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1 font-medium bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
