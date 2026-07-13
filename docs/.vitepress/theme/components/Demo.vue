<script setup lang="ts">
import { computed, ref } from 'vue'
import { AutoSkeleton } from 'auto-skeleton-vue'

const props = withDefaults(defineProps<{ variant?: 'card' | 'list' }>(), {
  variant: 'card',
})

const loading = ref(false)
function reload() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1600)
}

// Self-contained inline SVG avatar so the demo needs no network.
const avatar = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#7c3aed"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

const rows = [1, 2, 3]
</script>

<template>
  <div class="demo">
    <div class="demo-bar">
      <label><input type="checkbox" v-model="loading" /> loading</label>
      <button @click="reload">Simulate reload (1.6s)</button>
    </div>

    <div class="demo-stage">
      <ClientOnly>
        <AutoSkeleton :loading="loading" :id="`demo-${props.variant}`">
          <!-- Card variant -->
          <article v-if="props.variant === 'card'" class="pc">
            <img :src="avatar" width="64" height="64" class="pc-avatar" alt="" />
            <div class="pc-body">
              <h4>Ada Lovelace</h4>
              <p class="pc-role">Principal Engineer</p>
              <p class="pc-bio">
                Writes analytical engines and the occasional Vue component. Enjoys long
                walks through the call stack.
              </p>
              <div class="pc-actions">
                <button>Follow</button><button>Message</button>
              </div>
            </div>
          </article>

          <!-- List variant -->
          <ul v-else class="pl">
            <li v-for="r in rows" :key="r" class="pl-row">
              <div class="pl-thumb" />
              <div class="pl-text">
                <h4>List item number {{ r }}</h4>
                <p>A short supporting line that wraps onto roughly two lines of text.</p>
              </div>
            </li>
          </ul>
        </AutoSkeleton>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
/* The stage is white in both themes; use dark text for contrast. */
.pc {
  display: flex;
  gap: 16px;
  color: #111827;
}
.pc-avatar {
  border-radius: 50%;
  object-fit: cover;
  flex: none;
}
.pc-body {
  flex: 1;
}
.pc h4 {
  margin: 0 0 4px;
  font-size: 18px;
}
.pc-role {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 14px;
}
.pc-bio {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.5;
}
.pc-actions {
  display: flex;
  gap: 8px;
}
.pc-actions button {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #111827;
  cursor: pointer;
}

.pl {
  list-style: none;
  margin: 0;
  padding: 0;
  color: #111827;
}
.pl-row {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.pl-row:last-child {
  border-bottom: none;
}
.pl-thumb {
  width: 72px;
  height: 56px;
  border-radius: 8px;
  background: #cbd5e1;
  flex: none;
}
.pl-text h4 {
  margin: 0 0 6px;
  font-size: 15px;
}
.pl-text p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
