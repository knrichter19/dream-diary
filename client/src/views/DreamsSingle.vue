<template>
<div class="full-view">
    <div class="content">
        <h2>{{dream.title}}</h2>
        <p>{{dream.body}}</p>
    </div>
    <div class="details">
        <h4><span class="detail-question">Dreamed by: </span>{{dream.author}}</h4>
        <h4><span class="detail-question">Dreamed on: </span>{{new Date(dream.dreamedOn).toDateString("en-US")}}</h4>
        <h4><span class="detail-question">Posted on: </span>{{new Date(dream.postedOn).toLocaleString("en-US")}}</h4>
        <h4 v-if="dream.postedOn !== dream.updatedOn"><span class="detail-question">Last updated: </span>{{new Date(dream.updatedOn).toLocaleString("en-US")}}</h4>
        <h4><span class="detail-question">Lucid? </span>{{dream.lucid ? "Yes":"No"}}</h4>
        <h4><span class="detail-question">Nightmare? </span>{{dream.nightmare ? "Yes":"No"}}</h4>
    </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props: ["id"],
    setup(props){
        let dream = ref({
            // author: "Katya",
            // title: "My test dream",
            // body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, vero assumenda! Beatae, ipsum magni veniam assumenda amet eveniet, quam a molestias consequuntur soluta laboriosam magnam, culpa quis. Dolor minima a iusto saepe, ad sunt ratione eum ex perspiciatis in distinctio quasi inventore voluptas impedit? Nam voluptates maxime sapiente quaerat temporibus, tempore totam quas perspiciatis, necessitatibus minima nesciunt rerum repellat quis officiis perferendis magni, consequuntur nobis ad corrupti voluptas eligendi error praesentium. Iure harum odit unde? Quis, at, illum quibusdam dolore animi hic unde aliquam magnam debitis quas tenetur quaerat dicta cupiditate nulla delectus ab dolor porro nobis ipsa ipsum veritatis!",
            // dreamedOn: "2000-01-01",
            // postedOn: "2000-01-01 5am",
            // updatedOn: "2000-01-01 5am",
            // lucid: true,
            // nightmare: false
        })

        const getData = async ()=>{
            try{
                const data = await fetch("http://localhost:3000/dreams/"+props.id);
                console.log("here", "id=", props.id)
                dream.value = await data.json();
                console.log(dream.value);
            } catch (err){
                console.log(err);
            }
        }

        return {dream, getData}
    },
    created(){
        this.getData();
    }
}
</script>

<style>
.full-view{
    position: relative;
    width: 90%;
    margin: 0 auto;
}

.details{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30%;
}

.content{
    width: 70%;
}
</style>