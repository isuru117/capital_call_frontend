<template>
  <div class="card">
    <div :class="'card-inner ' + product.color">
      <div class="card-text-wrap">
        <h2 class="bg-text">{{ product.bgtext }}</h2>
      </div>
      <div class="card-image-wrap">
        <img :src="product.src" alt="Product Image" class="image" />
      </div>
      <div class="card-detail">
        <h2>{{ product.title }}</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt eligendi sed cupiditate
          eius dolores consequatur explicabo dignissimos magnam amet eveniet!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  /* Center the grid */
  max-width: 100%;
  padding: 0 2rem;
}

/* Add a media query for larger screens */
@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    /* Three cards per row */
  }
}

.card-inner {
  position: relative;
  padding: 25px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  perspective: 1000px;
}

.card-text-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  perspective: 1000px;
}

.card-text-wrap h2 {
  color: #313131;
  font-size: 128px;
  font-weight: 900;
  opacity: 0.2;
  transform-origin: center;
}

.card-image-wrap {
  position: relative;
  z-index: 1;
  transform-origin: center;
}

.card-image-wrap .image {
  width: 100%;
  filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
}

.card-detail {
  background-color: #fff;
  padding: 25px;
  margin: 0px -25px -25px;
}

.card-detail h2 {
  font-size: 24px;
  font-weight: 700;
  color: #676767;
  margin-bottom: 15px;
}

.card-detail p {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 300;
  color: #676767;
}
</style>
