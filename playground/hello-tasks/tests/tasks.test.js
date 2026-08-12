import { test } from "node:test";
import assert from "node:assert/strict";
import { addTask, completeTask } from "../src/tasks.js";

test("addTask appends a new task with incremented id", () => {
  const tasks = addTask([], "write chapter 1");
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].id, 1);
  assert.equal(tasks[0].done, false);
});

test("addTask rejects empty titles", () => {
  assert.throws(() => addTask([], "  "), /must not be empty/);
});

test("completeTask marks the matching task as done", () => {
  const tasks = addTask([], "review PR");
  const updated = completeTask(tasks, 1);
  assert.equal(updated[0].done, true);
});

test("completeTask throws for unknown id", () => {
  assert.throws(() => completeTask([], 99), /task not found/);
});
