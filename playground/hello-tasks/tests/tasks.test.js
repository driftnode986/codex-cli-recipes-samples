import { test } from "node:test";
import assert from "node:assert/strict";
import { addTask, completeTask, removeTask, updateTask } from "../src/tasks.js";

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
