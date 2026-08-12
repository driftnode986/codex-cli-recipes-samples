import { loadTasks, saveTasks, addTask, completeTask } from "./tasks.js";

const [, , command, ...args] = process.argv;

async function main() {
  const tasks = await loadTasks();

  switch (command) {
    case "add": {
      const updated = addTask(tasks, args.join(" "));
      await saveTasks(updated);
      console.log(`added: ${args.join(" ")}`);
      break;
    }
    case "done": {
      const updated = completeTask(tasks, Number(args[0]));
      await saveTasks(updated);
      console.log(`completed: #${args[0]}`);
      break;
    }
    case "list":
    default: {
      if (tasks.length === 0) {
        console.log("no tasks");
        break;
      }
      for (const t of tasks) {
        console.log(`${t.done ? "[x]" : "[ ]"} #${t.id} ${t.title}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
