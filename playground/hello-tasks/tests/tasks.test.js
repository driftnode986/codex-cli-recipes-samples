import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  addTask,
  completeTask,
  loadTasks,
  removeTask,
  saveTasks,
  updateTask,
} from "../src/tasks.js";

test("loadTasks returns saved tasks from a temporary file", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "hello-tasks-"));
  const filePath = join(directory, "tasks.json");
  const tasks = [{ id: 1, title: "write tests", done: false }];
  t.after(() => rm(directory, { recursive: true, force: true }));

  await saveTasks(tasks, filePath);

  assert.deepEqual(await loadTasks(filePath), tasks);
});

test("loadTasks returns an empty list when a temporary file does not exist", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "hello-tasks-"));
  const filePath = join(directory, "missing-tasks.json");
  t.after(() => rm(directory, { recursive: true, force: true }));

  assert.deepEqual(await loadTasks(filePath), []);
});

test("loadTasks rethrows parsing errors from a temporary file", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "hello-tasks-"));
  const filePath = join(directory, "tasks.json");
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeFile(filePath, "not JSON");

  await assert.rejects(loadTasks(filePath), SyntaxError);
});

test("saveTasks writes formatted JSON to a temporary file", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "hello-tasks-"));
  const filePath = join(directory, "tasks.json");
  const tasks = [{ id: 1, title: "write tests", done: true }];
  t.after(() => rm(directory, { recursive: true, force: true }));

  await saveTasks(tasks, filePath);

  assert.equal(await readFile(filePath, "utf-8"), `${JSON.stringify(tasks, null, 2)}\n`);
});

test("addTask appends a new task with incremented id", () => {
  const tasks = addTask([], "write chapter 1");
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].id, 1);
  assert.equal(tasks[0].done, false);
});

test("addTask rejects empty titles", () => {
  assert.throws(() => addTask([], "  "), /must not be empty/);
});

test("addTask uses an unused id after a task is removed", () => {
  const initial = addTask(addTask([], "first"), "second");
  const afterRemoval = removeTask(initial, 1);
  const updated = addTask(afterRemoval, "third");

  assert.deepEqual(updated, [
    { id: 2, title: "second", done: false },
    { id: 3, title: "third", done: false },
  ]);
});

test("completeTask marks the matching task as done", () => {
  const tasks = addTask([], "review PR");
  const updated = completeTask(tasks, 1);
  assert.equal(updated[0].done, true);
});

test("completeTask throws for unknown id", () => {
  assert.throws(() => completeTask([], 99), /task not found/);
});

test("removeTask removes the matching task without mutating the input", () => {
  const tasks = [
    { id: 1, title: "keep", done: false },
    { id: 2, title: "remove", done: false },
  ];

  const updated = removeTask(tasks, 2);

  assert.deepEqual(updated, [{ id: 1, title: "keep", done: false }]);
  assert.deepEqual(tasks, [
    { id: 1, title: "keep", done: false },
    { id: 2, title: "remove", done: false },
  ]);
});

test("removeTask throws for unknown id", () => {
  assert.throws(() => removeTask([], 99), /task not found: 99/);
});

test("updateTask updates a trimmed title without mutating the input", () => {
  const tasks = [
    { id: 1, title: "keep", done: false },
    { id: 2, title: "old title", done: true },
  ];

  const updated = updateTask(tasks, 2, "  new title  ");

  assert.deepEqual(updated, [
    { id: 1, title: "keep", done: false },
    { id: 2, title: "new title", done: true },
  ]);
  assert.notEqual(updated, tasks);
  assert.notEqual(updated[1], tasks[1]);
  assert.deepEqual(tasks, [
    { id: 1, title: "keep", done: false },
    { id: 2, title: "old title", done: true },
  ]);
});

test("updateTask rejects empty titles", () => {
  assert.throws(() => updateTask([], 1, "  "), /task title must not be empty/);
});

test("updateTask throws for unknown id", () => {
  assert.throws(() => updateTask([], 99, "new title"), /task not found: 99/);
});
