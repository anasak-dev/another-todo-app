export const getAllTodos = async () => {
  try {
    const todos = await fetch(`/api/showAllTodos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
    });
    return todos.json();
  } catch (error) {
    return `some error ${error}`;
  }
};
