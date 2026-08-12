import { readFile, writeFile } from "node:fs/promises";

const DB_PATH = new URL("../tasks.json", import.meta.url);

export async function loadTasks() {
  try {
    const raw = await readFile(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function saveTasks(tasks) {
  await writeFile(DB_PATH, JSON.stringify(tasks, null, 2) + "\n");
}

export function addTask(tasks, title) {
  if (!title || title.trim() === "") {
    throw new Error("task title must not be empty");
  }
  const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
  return [...tasks, { id: nextId, title: title.trim(), done: false }];
}

export function completeTask(tasks, id) {
  const found = tasks.find((t) => t.id === id);
  if (!found) {
    throw new Error(`task not found: ${id}`);
  }
  return tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
}

export function removeTask(tasks, id) {
  const found = tasks.find((t) => t.id === id);
  if (!found) {
    throw new Error(`task not found: ${id}`);
  }
  return tasks.filter((t) => t.id !== id);
}

export function updateTask(tasks, id, title) {
  if (!title || title.trim() === "") {
    throw new Error("task title must not be empty");
  }
  const found = tasks.find((t) => t.id === id);
  if (!found) {
    throw new Error(`task not found: ${id}`);
  }
  return tasks.map((t) => (t.id === id ? { ...t, title: title.trim() } : t));
}
