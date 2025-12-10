"use client"

import { ChevronDown } from "lucide-react"

export default function FilterBar({ filter, setFilter, sort, setSort, taskCount }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Filter:</span>
        <div className="flex gap-2">
          {[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                filter === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:ml-auto">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none px-4 py-2 bg-muted text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-8 cursor-pointer"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="created">Most Recent</option>
          </select>
          <ChevronDown size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <span className="text-sm text-muted-foreground px-4 py-2 bg-muted rounded-lg">
        {taskCount} task{taskCount !== 1 ? "s" : ""}
      </span>
    </div>
  )
}
