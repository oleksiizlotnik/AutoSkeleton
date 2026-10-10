<script setup lang="ts">
defineProps<{
  title: string
  price: string
  oldPrice: string
  rating: number
  image: string
}>()
</script>

<template>
  <article class="product">
    <div class="media">
      <img :src="image" :alt="title" />
      <span class="badge">-30%</span>
    </div>
    <div class="info">
      <h3>{{ title }}</h3>
      <div class="stars">
        <span v-for="n in 5" :key="n" :class="{ on: n <= rating }">★</span>
      </div>
      <div class="prices">
        <span class="price">{{ price }}</span>
        <span class="old">{{ oldPrice }}</span>
      </div>
      <button>Add to cart</button>
    </div>
  </article>
</template>

<style scoped>
.product {
  width: 220px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.media {
  position: relative;
}
.media img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}
.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
}
.info {
  padding: 12px;
}
.info h3 {
  margin: 0 0 6px;
  font-size: 15px;
}
.stars {
  color: #d1d5db;
  font-size: 14px;
  margin-bottom: 8px;
}
.stars .on {
  color: #f59e0b;
}
.prices {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}
.price {
  font-size: 18px;
  font-weight: 700;
}
.old {
  font-size: 13px;
  color: #9ca3af;
  text-decoration: line-through;
}
button {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
</style>
