import { ref } from "vue";

export const todoList = ref({
  todos: [
    {
      id: 3,
      title: "Cleantable",
      dueDate: "13 May 2023",
      description: "Clean my computer table, remove all the trash",
      status: "in progress",
      priority: "low",
    },
    {
      id: 2,
      title: "Cleantable",
      dueDate: "13 May 2023",
      description: "Clean my computer table, remove all the trash",
      status: "in progress",
      priority: "high",
    },
    {
      id: 4,
      title: "Cleantable",
      dueDate: "13 May 2023",
      description: "Clean my computer table, remove all the trash",
      status: "in progress",
      priority: "average",
    },
    {
      id: 5,
      title: "Cleantable",
      dueDate: "13 May 2023",
      description: "Clean my computer table, remove all the trash",
      status: "in progress",
      priority: "high",
    },
  ],
});
