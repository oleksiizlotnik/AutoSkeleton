<script setup lang="ts">
defineProps<{
  name: string
  email: string
  bio: string
}>()
</script>

<template>
  <form class="form" @submit.prevent>
    <h3>Profile settings</h3>
    <label>
      <span>Full name</span>
      <input type="text" :value="name" />
    </label>
    <label>
      <span>Email</span>
      <input type="email" :value="email" />
    </label>
    <label>
      <span>Bio</span>
      <textarea rows="3" :value="bio" />
    </label>
    <div class="row">
      <button type="button" class="ghost">Cancel</button>
      <button type="submit">Save changes</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  width: 100%;
  max-width: 420px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
}
.form h3 {
  margin: 0 0 16px;
}
label {
  display: block;
  margin-bottom: 14px;
}
label span {
  display: block;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}
input,
textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  box-sizing: border-box;
}
.row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}
button {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
button.ghost {
  background: #fff;
  color: #374151;
}
</style>
