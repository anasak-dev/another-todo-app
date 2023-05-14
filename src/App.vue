<script setup>
import todoBg from "./assets/todoBg.png";
import { facts } from "./components/loaderFacts";
const currentFact = ref(0);

setInterval(() => {
  currentFact.value++;
  if (currentFact.value >= facts.length) {
    currentFact.value = 0;
  }
}, 2000);
</script>

<template>
  <div>
    <img
      :src="todoBg"
      class="w-full pointer-events-none h-full over bg-cover absolute -z-5"
      alt=""
    />
    <div
      :class="{ blurredBg: blurredBg }"
      class="p-4 app pt-0 flex flex-col gap-6 min-h-[100vh] h-full bg-gradient-to-t from-[#385AD4] to-[#86A1FF]"
    >
      <div
        :class="{
          flex: deleteTaskConfirmation,
          hidden: !deleteTaskConfirmation,
        }"
        class="w-full h-full items-center justify-center left-0 top-0 absolute z-10"
      >
        <Transition name="fromBottom">
          <div
            v-if="deleteTaskConfirmation"
            class="z-10 bg-white px-6 py-6 flex flex-col gap-4 max-w-[320px] rounded-md"
          >
            <h4 class="text-md text-center">
              Confirm if you want to delete the task
            </h4>
            <hr />
            <div class="flex">
              <input
                type="submit"
                value="Yes, delete it"
                name="Add new Todo"
                @click="deleteTaskConfirm"
                class="text-lg hover:opacity-90 cursor-pointer bg-[#2650E8] rounded-md text-white px-6 py-2 w-full"
              />
              <input
                type="button"
                value="Cancel"
                @click="cancelDeleteTask"
                class="text-lg bg-transparent basis-1/4 rounded-full text-black px-6 py-2 w-full"
              />
            </div>
          </div>
        </Transition>
      </div>

      <Suspense timeout="0">
        <template #default>
          <ShowAllTodos
            @open-blur-bg="blurbg"
            :latest-todos="latestTodos"
            @delete-task="(id) => openDeleteTaskModal(id)"
            :deleteTodo="deleteTask"
          />
        </template>
        <template #fallback>
          <div
            class="loader flex items-center justify-center w-full h-full top-0 left-0 z-10 fixed"
          >
            <div
              class="z-10 bg-white flex flex-col max-w-[320px] rounded-md overflow-hidden transition"
            >
              <div
                class="bg-gray-100 px-6 py-6 flex flex-col gap-1 justify-center items-center"
              >
                <h4 class="text-2xl text-center font-bold">
                  Loading your tasks
                </h4>
                <p class="text-sm">Have some facts while you wait</p>
              </div>
              <div class="flex flex-col overflow-hidden px-4 py-4">
                <TransitionGroup mode="out-in" name="fromBottom">
                  <div v-for="(fact, index) in facts" :key="index">
                    <li
                      v-if="index == currentFact"
                      class="list-none text-center text-sm"
                    >
                      {{ fact }}
                    </li>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import ShowAllTodos from "./components/showAllTodos.vue";
import { getAllTodos } from "./components/getAllTodos";
const deleteTaskConfirmation = ref(false);
const deleteTask = ref(false);
const deleteTodoId = ref("");
const blurredBg = ref(false);
const deleteTodo = await ((todoId) =>
  fetch(`/api/deleteTodo`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ id: todoId }),
  }));
const openDeleteTaskModal = (id) => {
  deleteTaskConfirmation.value = true;
  deleteTodoId.value = id;
};

const latestTodos = ref({
  todos: "",
  loadingState: false,
  loadingStateText: "",
});
const deleteTaskConfirm = async () => {
  latestTodos.value.loadingState = true;
  latestTodos.value.loadingStateText = "Deleting todo";
  blurredBg.value = true;
  deleteTaskConfirmation.value = false;
  deleteTodo(deleteTodoId.value).then(async () => {
    latestTodos.value.loadingStateText = "Getting all todos";

    await getAllTodos().then((data) => {
      blurredBg.value = false;
      latestTodos.value.todos = data;
      deleteTask.value = true;
      blurredBg.value = false;
      latestTodos.value.loadingState = false;
    });
  });
};
const cancelDeleteTask = () => {
  deleteTaskConfirmation.value = false;
  blurredBg.value = false;
};
const blurbg = () => {
  blurredBg.value = !blurredBg.value;
};
</script>
<style>
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
.blurredBg:before {
  position: fixed;
  content: "";
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #0000008f;
  backdrop-filter: blur(5px);
}
.loader {
  animation: changeBgColor 7s ease-in;
  animation-iteration-count: infinite;
}

@keyframes changeBgColor {
  0% {
    background-color: #63a6ff;
  }
  25% {
    background-color: #557aff;
  }
  50% {
    background-color: #7b5aff;
  }
  100% {
    background-color: #b266ff;
  }
}
</style>
