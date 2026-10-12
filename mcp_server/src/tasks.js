const tasks = [];

export function createTask(title) {
  tasks.push(title);
  return `Task created: ${title}`;
}

export function listTasks() {
  return JSON.stringify(tasks);
}

export function completeTask(title) {
  const index = tasks.indexOf(title);

  if (index === -1) {
    return `Task not found: ${title}`;
  }

  tasks.splice(index, 1);
  return `Task completed: ${title}`;
}
