<template>
<div class="editWrapper">
    <div class="editPane">
        <h3>Title:</h3>
        <input class="editTitle" name="title" v-model="dreamSubmit.title" type = "Text" required>
        <div class="flex-center">
            <label for="dreamedOn">Date dreamed:</label>
            <input type="date" name="dreamedOn" v-model="dreamSubmit.dreamedOn">
        </div>
        <h3>Content:</h3>
        <textarea name="body" v-model="dreamSubmit.body" required>Enter Dream Info Here</textarea>
        <div class="flex-center">
            <input type="checkbox" id="checkLucid" name="checkLucid" value="lucid" v-model="dreamSubmit.lucid">
            <label for="checkLucid">Lucid?</label>
            <input type="checkbox" id="checkNightmare" name="checkNightmare" value="nightmare" v-model="dreamSubmit.nightmare">
            <label for="checkLucid">Nightmare?</label>
        </div>
        <div class="editButtons">
            <button @click="submitChanges" class="editSubmit">Submit</button>
        </div>
    </div>
</div>
    
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
export default {
    props: ["dream"],
    setup(props){
        const router = useRouter();
        const dreamSubmit = ref({
            author: "Katya",
            title: "Title",
            body: "Type your dream here!",
            dreamedOn: "2000-01-01",
            lucid: false,
            nightmare: false
        });
        if (props.dream) {
            dreamSubmit.value = props.dream;
        }

        const submitChanges = async() => {
            // todo: check for edit vs new

            dreamSubmit.value.dreamedOn = new Date(dreamSubmit.value.dreamedOn).toJSON().slice(0, 10);
            console.log("DREAM SUBMITTED:");
            console.log(dreamSubmit.value);

            let newId = "";
            
            // put if making an edit
            if (dreamSubmit.value.id){
                await fetch("http://localhost:3000/dreams/" + dreamSubmit.value.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(dreamSubmit.value)
                }).then(data => data.json()).then(response => {
                    console.log("RESPONSE:", response)
                    newId = response.result.id;
                })

            } else { // post if making a new one
                await fetch("http://localhost:3000/dreams", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(dreamSubmit.value)
                }).then(data => data.json()).then(response => {
                    console.log("RESPONSE:", response)
                    newId = response.result.id;
                })
            }
            // redirect to dream page
            router.push({ path: '/dreams/'+newId }) // todo: maybe pass in the data we get back to avoid making a new request?
        }

        return {
            submitChanges,
            dreamSubmit
        }
    }
}
</script>

<style scoped>
.editWrapper{
    padding: 20px;
}
.editPane{
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 1px solid grey;
    margin: 0 auto;
}

.flex-center{
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.editButtons{
    display: flex;
    justify-content: center;
}

.editSubmit{
    background-color: navy;
    color: white;
    font-size: 20px;
    padding: 5px;
    margin: 6px;
    border: none;
    border-radius: 10px;
}

.editTitle {
    height: 20px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid grey;
    margin: 6px;
}

</style>