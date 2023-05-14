export const getAllTodos = async () => {
  const todos = await fetch(`/api/showAllTodos`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
  });
  return todos.json();
};
