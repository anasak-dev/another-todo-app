export const postTodoData = async (data) => {
  const todoData = await fetch(`/api/addTodo`, {
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
