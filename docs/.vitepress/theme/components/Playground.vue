<script setup lang="ts">
import { computed, ref } from 'vue'
import { AutoSkeleton } from 'auto-skeleton-vue'

const loading = ref(false)
const animated = ref(true)

function reload() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1600)
}

// Self-contained inline SVG avatar — no network needed.
// viewBox + <circle> so it scales to any size and stays perfectly round.
const avatar = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#7c3aed"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

const rows = [1, 2, 3, 4]
const tiles = [
  { label: 'Revenue', value: '$48.2k', trend: '▲ 12.4%' },
  { label: 'Active users', value: '3,910', trend: '▲ 4.1%' },
  { label: 'Churn', value: '1.8%', trend: '▼ 0.3%' },
]
</script>

<template>
  <div class="pg">
    <div class="pg-controls">
      <label><input type="checkbox" v-model="loading" /> loading</label>
      <label><input type="checkbox" v-model="animated" /> animated</label>
      <button @click="reload">Simulate reload (1.6s)</button>
    </div>

    <div class="pg-grid">
      <!-- Profile card -->
      <section>
        <h4 class="pg-label">Profile card</h4>
        <div class="pg-stage">
          <ClientOnly>
            <AutoSkeleton :loading="loading" :animated="animated" id="pg-card">
              <article class="pc">
                <img :src="avatar" width="72" height="72" class="pc-avatar" alt="" />
                <div class="pc-body">
                  <h4>Ada Lovelace</h4>
                  <p class="pc-role">Principal Engineer</p>
                  <p class="pc-bio">
                    Writes analytical engines and the occasional Vue component. Enjoys
                    long walks through the call stack.
                  </p>
                  <div class="pc-actions">
                    <button>Follow</button><button>Message</button>
                  </div>
                </div>
              </article>
            </AutoSkeleton>
          </ClientOnly>
        </div>
      </section>

      <!-- Stat tiles -->
      <section>
        <h4 class="pg-label">Stat tiles (grid)</h4>
        <div class="pg-stage">
          <ClientOnly>
            <AutoSkeleton :loading="loading" :animated="animated" id="pg-tiles">
              <div class="tiles">
                <div v-for="t in tiles" :key="t.label" class="tile">
                  <p class="tile-label">{{ t.label }}</p>
                  <p class="tile-value">{{ t.value }}</p>
                  <p class="tile-trend">{{ t.trend }}</p>
                </div>
              </div>
            </AutoSkeleton>
          </ClientOnly>
        </div>
      </section>

      <!-- Article list -->
      <section>
        <h4 class="pg-label">Article list (v-for)</h4>
        <div class="pg-stage">
          <ClientOnly>
            <AutoSkeleton :loading="loading" :animated="animated" id="pg-list">
              <ul class="pl">
                <li v-for="r in rows" :key="r" class="pl-row">
                  <div class="pl-thumb" />
                  <div class="pl-text">
                    <h4>Article number {{ r }}</h4>
                    <p>A short excerpt describing what this article is about.</p>
                  </div>
                </li>
              </ul>
            </AutoSkeleton>
          </ClientOnly>
        </div>
      </section>

      <!-- Settings form -->
      <section>
        <h4 class="pg-label">Settings form</h4>
        <div class="pg-stage">
          <ClientOnly>
            <AutoSkeleton :loading="loading" :animated="animated" id="pg-form">
              <form class="form" @submit.prevent>
                <label><span>Full name</span><input type="text" value="Katherine Johnson" /></label>
                <label><span>Email</span><input type="email" value="katherine@nasa.gov" /></label>
                <label><span>Bio</span><textarea rows="2">Calculates trajectories.</textarea></label>
                <div class="form-row">
                  <button type="button" class="ghost">Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </AutoSkeleton>
          </ClientOnly>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pg-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
  font-size: 14px;
}
.pg-controls label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.pg-controls button {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.pg-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(320px, 1fr));
  gap: 20px;
}
.pg-label {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
}
.pg-stage {
  background: #fff;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  color: #111827;
}

/* Profile card */
.pc {
  display: flex;
  gap: 16px;
}
.pc-avatar {
  width: 72px;
  height: 72px;
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

/* Stat tiles */
.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tile {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.tile-label {
  margin: 0 0 6px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}
.tile-value {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
}
.tile-trend {
  margin: 0;
  font-size: 12px;
  color: #10b981;
}

/* Article list */
.pl {
  list-style: none;
  margin: 0;
  padding: 0;
}
.pl-row {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.pl-row:last-child {
  border-bottom: none;
}
.pl-thumb {
  width: 64px;
  height: 48px;
  border-radius: 8px;
  background: #cbd5e1;
  flex: none;
}
.pl-text h4 {
  margin: 0 0 4px;
  font-size: 15px;
}
.pl-text p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

/* Settings form */
.form label {
  display: block;
  margin-bottom: 12px;
}
.form label span {
  display: block;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}
.form input,
.form textarea {
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  box-sizing: border-box;
}
.form-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.form-row button {
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
.form-row button.ghost {
  background: #fff;
  color: #374151;
}
</style>
