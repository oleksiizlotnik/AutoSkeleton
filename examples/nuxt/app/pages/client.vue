<script setup lang="ts">
// Fetched only in the browser. `status` is 'idle' while the server renders and
// 'pending' while the browser hydrates, so both count as loading.
const { data: team, status } = useLazyFetch('/api/team', { server: false })
</script>

<template>
  <section>
    <h2>Client-only fetch</h2>
    <p>
      With <code>server: false</code> the server renders the loading state. The wrapped content is
      a plain <code>&lt;ul&gt;</code> rather than a component, so it gets an explicit
      <code>id</code> — otherwise every plain-element wrapper would share one cached layout.
    </p>

    <AutoSkeleton id="team-list" :loading="status === 'idle' || status === 'pending'">
      <ul class="team">
        <li v-for="member in team" :key="member.name">
          <span class="initial">{{ member.name[0] }}</span>
          <div>
            <strong>{{ member.name }}</strong>
            <p class="muted">{{ member.role }}</p>
          </div>
        </li>
      </ul>
    </AutoSkeleton>
  </section>
</template>
