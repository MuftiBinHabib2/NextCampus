import React, { useState } from "react";

const TodoList = ({ todos, onUpdateTodos }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, deadline, priority
  const [filterStatus, setFilterStatus] = useState("Pending"); // Pending, Completed, All

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = {
      id: `td-${Date.now()}`,
      title: taskTitle.trim(),
      priority,
      deadline,
      status: "Pending"
    };

    onUpdateTodos([newTask, ...todos]);
    setTaskTitle("");
    setPriority("Medium");
    setDeadline("");
  };

  const handleToggleTask = (id) => {
    const updated = todos.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
        : t
    );
    onUpdateTodos(updated);
  };

  const handleDeleteTask = (id) => {
    const filtered = todos.filter((t) => t.id !== id);
    onUpdateTodos(filtered);
  };

  const getPriorityStyle = (prio) => {
    switch (prio) {
      case "High":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  // Sort and filter logic
  const processedTodos = todos
    .filter((t) => {
      if (filterStatus === "All") return true;
      return t.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === "priority") {
        const priorities = { High: 3, Medium: 2, Low: 1 };
        return priorities[b.priority] - priorities[a.priority];
      }
      return 0; // default (order of creation/addition)
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Todo Action List</h2>
        <p className="text-gray-400 text-sm">Add daily tasks, set priorities, and set deadlines to keep yourself on track.</p>
      </div>

      {/* Add Task Box */}
      <form onSubmit={handleAddTask} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-400 uppercase">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Schedule TOEFL test, Get official syllabus"
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-44">
            <label className="block text-xs font-semibold text-gray-400 uppercase">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🔵 Low</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-gray-400 uppercase">Due Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white rounded-xl text-sm font-semibold"
          >
            ＋ Add Task
          </button>
        </div>
      </form>

      {/* Control bar (Filters & Sorting) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
        <div className="flex gap-2 text-xs">
          {["Pending", "Completed", "All"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                filterStatus === status
                  ? "bg-blue-500/20 border-blue-500/30 text-blue-300 font-semibold"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {status} ({status === "All" ? todos.length : todos.filter(t => t.status === (status === "Pending" ? "Pending" : "Completed")).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="default">Date Added</option>
            <option value="deadline">📅 Deadline</option>
            <option value="priority">🔥 Priority</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      {processedTodos.length > 0 ? (
        <div className="space-y-3">
          {processedTodos.map((todo) => {
            const isCompleted = todo.status === "Completed";
            return (
              <div
                key={todo.id}
                className={`flex items-center justify-between gap-4 p-4 bg-white/5 border rounded-xl hover:border-white/20 transition ${
                  isCompleted ? "border-emerald-500/20 bg-emerald-500/[0.01]" : "border-white/10"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => handleToggleTask(todo.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold text-xs"
                        : "border-white/30 hover:border-white/50 text-transparent"
                    }`}
                  >
                    {isCompleted ? "✓" : ""}
                  </button>
                  <span className={`text-sm sm:text-base truncate font-medium ${
                    isCompleted ? "text-gray-500 line-through" : "text-white"
                  }`}>
                    {todo.title}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {todo.deadline && (
                    <span className="hidden sm:inline-block text-xs text-gray-400">
                      📅 {new Date(todo.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityStyle(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(todo.id)}
                    className="p-1 text-gray-500 hover:text-rose-400 rounded transition"
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 text-sm">
          <span>✨</span>
          <p>No tasks found in this section.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
