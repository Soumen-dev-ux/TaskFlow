import { ChevronDown } from "lucide-react"

function FilterBar({ filter, setFilter, setSort, taskCount = 0, query = "", setQuery }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          aria-pressed={filter === "all"}
          className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"} hover:bg-primary/90`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          aria-pressed={filter === "pending"}
          className={`px-3 py-1 rounded-md ${filter === "pending" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"} hover:bg-primary/90`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          aria-pressed={filter === "completed"}
          className={`px-3 py-1 rounded-md ${filter === "completed" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"} hover:bg-primary/90`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Tasks: {taskCount}</span>
        <input
          value={query}
          onChange={(e) => setQuery && setQuery(e.target.value)}
          placeholder="Search title or description…"
          className="p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search tasks"
        />
        <label className="text-sm text-muted-foreground" htmlFor="sort-select">Sort</label>
        <div className="relative inline-flex">
          <select
            id="sort-select"
            aria-label="Sort tasks"
            title="Sort tasks"
            className="p-2 pr-8 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            onChange={(e) => setSort(e.target.value)}
            defaultValue=""
          >
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

export default FilterBar;
