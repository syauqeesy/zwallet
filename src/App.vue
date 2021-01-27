<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="css">
.avatar-picture {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1px solid;
  border-radius: .25em;
}
</style>
