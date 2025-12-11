function FilterBar({ setFilter, setSort }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          className="px-3 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="px-3 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className="px-3 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">Sort</label>
        <select
          className="p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setSort(e.target.value)}
          defaultValue=""
        >
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar;
