<template>
  <nav class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/dreams">All</router-link>
    <router-link to="/new">New</router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>

.header{
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    background-color: navy;
}

.header a {
  font-weight: bold;
  color: white;
  margin: auto 10px;
}

.header a.router-link-exact-active {
  color: cyan;
}

</style>