<template>
  <div class="fixed flex w-full h-full">
    <!-- Sidebar -->
    <div class="flex-shrink-0 hidden w-96 lg:block sidebar">
      <SideMenu />
    </div>
    <!-- Main Content -->
    <div class="flex-grow w-full overflow-y-auto">
      <Navbar />
      <!-- Your main content goes here -->
      <slot/>
      
    </div>
  </div>

  <div vaal-drawer-wrapper id="app"></div>

</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const idleLimit = 15 * 60 * 1000; // 15 minutes
let idleTimer: ReturnType<typeof setTimeout> | null = null;

function resetTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(logoutUser, idleLimit);
}

function logoutUser() {
  // Clear tokens/session
    // Clear token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  sessionStorage.clear();

  // Redirect to login
    router.push('/auth/login');
}

onMounted(() => {
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((event) =>
    window.addEventListener(event, resetTimer)
  );
  resetTimer(); // start timer
});

onUnmounted(() => {
  if (idleTimer) clearTimeout(idleTimer);
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((event) =>
    window.removeEventListener(event, resetTimer)
  );
});

</script>
<style></style>
