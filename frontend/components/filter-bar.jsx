"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { ChevronDown, Zap } from "lucide-react"

export default function FilterBar({ filter, setFilter, sort, setSort, taskCount }) {
  return (
    <Card className="p-4 bg-card border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <span className="text-sm font-semibold text-muted-foreground">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "completed"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-primary text-primary-foreground font-medium" : "font-medium"}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">{taskCount}</span>
            <span className="text-muted-foreground">{taskCount === 1 ? "task" : "tasks"}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 font-medium bg-transparent">
                Sort: {sort === "dueDate" ? "Due Date" : sort === "priority" ? "Priority" : "Created"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSort("dueDate")} className="cursor-pointer">
                <span>Due Date</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("priority")} className="cursor-pointer">
                <span>Priority</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("createdAt")} className="cursor-pointer">
                <span>Recently Created</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
