<template>
  <div class="displayHorizontal">
    <div class="dreamTile" v-for="dream in dreams" :key="dream.id"> <!-- move to own component? -->
        <h2><a :href="`/dreams/`+dream.id">{{dream.title}}</a></h2>
        <p>{{dream.author}} - {{new Date(dream.dreamedOn).toDateString("en-US")}} (Posted {{new Date(dream.postedOn).toLocaleString("en-US")}})</p>
        <p>{{dream.body.substr(0, 50)}}...</p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup(){
        const dreams = ref([]);
        onMounted(async () => {
            await fetch('http://localhost:3000/dreams')
            .then((response) => response.json())
            .then((data) => dreams.value = data);
        })

        return { dreams }
    }
}
</script>

<style>

</style>