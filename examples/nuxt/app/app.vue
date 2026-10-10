<template>
  <div class="page">
    <header>
      <h1>auto-skeleton-vue <span class="muted">× Nuxt</span></h1>
      <nav>
        <NuxtLink to="/">Server-rendered</NuxtLink>
        <NuxtLink to="/lazy">Lazy fetch</NuxtLink>
        <NuxtLink to="/client">Client-only</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
    <footer class="muted">
      <a href="https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt">Nuxt guide</a> ·
      <a href="https://github.com/oleksiizlotnik/AutoSkeleton">GitHub</a>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #111827;
  background: #ffffff;
  line-height: 1.5;
}
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
}
h1 {
  font-size: 1.4rem;
  margin: 0 0 8px;
}
h2 {
  font-size: 1.1rem;
  margin: 24px 0 4px;
}
h3 {
  margin: 0 0 2px;
}
p {
  margin: 0 0 12px;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
a {
  color: #7c3aed;
}
nav a.router-link-exact-active {
  font-weight: 600;
  text-decoration: none;
}
button {
  font: inherit;
  padding: 4px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
}
button.primary {
  margin-bottom: 16px;
  border-color: #7c3aed;
  background: #7c3aed;
  color: #ffffff;
}
.muted {
  color: #6b7280;
}
.card {
  display: flex;
  gap: 16px;
}
.avatar {
  border-radius: 50%;
  flex: none;
}
.actions {
  display: flex;
  gap: 8px;
}
.team {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.team li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.team p {
  margin: 0;
}
.initial {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ede9fe;
  color: #7c3aed;
  font-weight: 600;
}
footer {
  margin-top: 32px;
  font-size: 0.9rem;
}
</style>
