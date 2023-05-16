export const updateTodoData = async (data) => {
  const todoData = await fetch(`/api/updateTodo`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "post",
  });

  const jsonData = await todoData.json();
  return jsonData;
};
