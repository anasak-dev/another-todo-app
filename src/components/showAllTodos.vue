<template>
  <div
    v-show="todoList.todos.length == 0"
    class="flex pt-10 flex-col items-center"
  >
    <img :src="noTasksIcon" alt="" />
    <h4 class="text-xl text-black/80 text-center px-4 py-6 text-white">
      Its empty here <br />
      add some tasks
    </h4>
  </div>
  <div class="h-[100vh]">
    <div class="todo-list">
      <TransitionGroup name="todos" mode="out-in">
        <div
          class="text-4xl relative max-w-[540px] mx-auto my-0 w-full rounded-md bg-white"
          :class="{
            'bg-gray-200 ': todo.status == 'completed',
            lowPriority: todo.priority == 'low',
            highPriority: todo.priority == 'high',
            averagePriority: todo.priority == 'average',
          }"
          v-for="todo in todoList.todos"
          :key="todo.id"
        >
          <div class="px-4 py-4 flex flex-col gap-5">
            <!-- Task title & due date -->
            <div class="flex justify-between w-full">
              <div :class="{ 'line-through': todo.status == 'completed' }">
                <h4 class="text-lg font-bold flex flex-col gap-2">
                  {{ todo.title }}
                </h4>
                <h4 class="text-gray-400 text-sm">
                  {{ todo.dueDate }}
                </h4>
              </div>

              <div class="flex flex-row gap-2">
                <input
                  type="checkbox"
                  :class="{
                    'border-gray-400 checked:bg-gray-400':
                      todo.priority == 'low',
                    'border-red-400 checked:bg-red-400':
                      todo.priority == 'high',
                    'border-yellow-400 checked:bg-yellow-400':
                      todo.priority == 'average',
                  }"
                  class="markAsCompleted bg-transparent appearance-none w-[40px] h-[40px] rounded-full border-2"
                  @click="markCompleted(todo.id)"
                />
                <button
                  v-if="todo.status == 'completed'"
                  class="text-xl font-sans hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-full relative hover:before:scale-125 hover:scale-90 hover:before:rounded-full hover:before:border hover:before:border-black transition flex items-center justify-center font-light bg-black text-white rounded-full w-[40px] h-[40px]"
                  @click="deleteTask(todo.id)"
                >
                  x
                </button>
              </div>
            </div>
            <!-- Task title & due date & Action button -->

            <hr class="w-full bg-gray-50" />
            <!-- Task Description text -->

            <div class="task flex flex-col">
              <div :class="{ 'line-through': todo.status == 'completed' }">
                <h4 class="text-gray-400 text-sm">Description</h4>
                <h4 class="text-lg font-normal">
                  {{ todo.description }}
                </h4>
              </div>
            </div>
            <!-- Task Description text -->

            <hr class="w-full bg-gray-50" />

            <div class="flex gap-x-2">
              <div
                class="priority rounded-full py-1 px-4 text-sm"
                :class="{
                  'bg-red-400': todo.priority == 'high',
                  'bg-yellow-400': todo.priority == 'average',
                  'bg-gray-400': todo.priority == 'low',
                }"
              >
                {{ todo.priority }}
              </div>
              <div class="status rounded-full py-1 px-4 bg-green-400 text-sm">
                {{ todo.status }}
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
  <div
    :class="{
      'z-10': todoModalOpen,
    }"
    class="fixed bottom-4 w-full max-w-[90%] mx-auto my-0 left-0 grid right-0 rounded-md todo-add-btn bg-white"
  >
    <button
      :class="{ 'shadow-3xl': !todoModalOpen }"
      class="text-2xl bg-white text-black px-6 rounded-md py-4 w-full"
      @click="openTodoModal"
    >
      Add todo
    </button>
    <div
      class="inner grid transition-all"
      :class="{
        'z-fr ': !todoModalOpen,
        'one-fr ': todoModalOpen,
      }"
    >
      <form
        @submit.prevent="addTodo"
        v-show="todoModalOpen"
        class="max-w-[420px] w-full my-0 mx-auto overflow-hidden py-4 px-4 flex flex-col gap-8"
      >
        <hr />
        <div class="flex flex-col gap-2">
          <label for="title" class="text-lg tracking-wide text-black"
            >Title</label
          >
          <input
            type="text"
            name="title"
            class="w-full px-4 py-3 bg-gray-100 rounded-sm"
            v-model="formData.title"
            placeholder="Task tile"
            required
          />
          <input type="hidden" name="" v-model="formData.id" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="title" class="text-lg tracking-wide text-black"
            >Description</label
          >
          <textarea
            type="text"
            name="title"
            required
            v-model="formData.description"
            class="w-full px-4 py-3 rounded-sm bg-gray-100"
            placeholder="Clean my table and how i do that"
          >
          </textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label for="title" class="text-lg tracking-wide text-black"
            >Priority</label
          >

          <div class="flex gap-2">
            <label class="flex items-center gap-1">
              <input
                type="radio"
                v-model="formData.priority"
                name="priority"
                value="high"
                class="bg-red-400"
                id=""
              />
              <span>High</span></label
            >
            <label class="flex items-center gap-1">
              <input
                type="radio"
                v-model="formData.priority"
                name="priority"
                value="average"
                class="bg-yellow-400"
              />
              Average
            </label>
            <label class="flex items-center gap-1">
              <input
                type="radio"
                v-model="formData.priority"
                name="priority"
                value="low"
                checked
                class="bg-gray-400"
              />
              Low
            </label>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="title" class="text-lg tracking-wide text-black"
            >Due Date</label
          >
          <input
            type="date"
            name="dueDate"
            v-model="formData.dueDate"
            class="w-full px-4 py-3 rounded-sm bg-gray-100 appearance-none"
            placeholder="Enter due date"
            required
          />
        </div>
        <div class="flex">
          <input
            type="submit"
            value="Add todo"
            name="Add new Todo"
            class="text-lg hover:opacity-90 cursor-pointer bg-[#2650E8] rounded-md text-white px-6 py-2 w-full"
          />
          <input
            type="button"
            value="Cancel"
            @click="openTodoModal"
            class="text-lg bg-transparent basis-1/4 rounded-full text-black px-6 py-2 w-full"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { facts } from "./loaderFacts";
import { ref, reactive } from "vue";
import { uniquieId } from "./uniqueID";
const currentFact = ref(0);
const loaderActive = ref(false);

setInterval(() => {
  if (loaderActive.value == true) {
    currentFact.value++;
    if (currentFact.value >= facts.length) {
      currentFact.value = 0;
    }
  }
}, 2000);
import noTasksIcon from "../assets/tumbleIcon.png";
import { todoList } from "./todos.js";

const emits = defineEmits(["openBlurBg", "deleteTask"]);
const props = defineProps({
  deleteTodo: {
    default: false,
    type: Boolean,
  },
});

const formData = reactive({
  id: uniquieId(),
  title: "",
  description: "",
  dueDate: "",
  status: "in progress",
  priority: "low",
});
const todoModalOpen = ref(false);
const todoWhatsup = ref("");
const openTodoModal = () => {
  todoModalOpen.value = !todoModalOpen.value;
  emits("openBlurBg");
};
//   mark as completed

const markCompleted = (todoId) => {
  todoList.value.todos.forEach((item) => {
    if (item.id == todoId && item.status == "in progress") {
      item.status = "completed";
    } else if (item.id == todoId && item.status == "completed") {
      item.status = "in progress";
    }
  });
  console.log(todoId);
};
// delete task
const deleteTask = async (todoId) => {
  emits("deleteTask", todoId);
  emits("openBlurBg");

  // loaderActive.value = true;
  if (props.deleteTodo != true) {
    return;
  }
  todoWhatsup.value = "Deleting Todo";
};

// add todo
const addTodo = () => {
  openTodoModal();
  const newTodoData = {
    id: formData.id,
    description: formData.description,
    dueDate: formData.dueDate,
    status: formData.status,
    priority: formData.priority,
    title: formData.title,
  };
  todoList.value.todos.unshift(newTodoData);
  formData.title = "";
  formData.description = "";
  formData.dueDate = "";
  formData.status = "in progress";
  formData.priority = "low";
  formData.id = uniquieId();
};
</script>
<style>
.todo-list::-webkit-scrollbar {
  width: 0;
}

/* transition on height auto https://www.youtube.com/watch?v=B_n4YONte5A */
.z-fr {
  grid-template-rows: 0fr;
}
.one-fr {
  grid-template-rows: 1fr;
}
/* transition on height auto https://www.youtube.com/watch?v=B_n4YONte5A */

.todo-list {
  display: flex;
  flex-flow: column;
  gap: 25px;
  overflow-y: scroll;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 80px;
}

.todos-enter-from,
.todos-leave-to {
  opacity: 0;
  animation: brr 0.3s ease-in;
}
.todos-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.todos-move /* apply transition to moving elements */ {
  transition: all 0.5s cubic-bezier(0, 0.99, 0.27, 0.99);
}

.fromBottom-enter-active,
.fromBottom-leave-active {
  transform: translateY(0px);
  transition: transform 0.3s cubic-bezier(0, 0.99, 0.27, 0.99);
  opacity: 1;
}

.fromBottom-enter-from,
.fromBottom-leave-to {
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s cubic-bezier(0, 0.99, 0.27, 0.99);
}
@keyframes brr {
  100% {
    scale: 0.7;
  }
}
</style>
