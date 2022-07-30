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
export default {
    props: ["dream"],
    setup(props){
        const dreamSubmit = ref({
            author: "Katya",
            title: "Title",
            body: "Type your dream here!",
            dreamedOn: "2000-01-01",
            postedOn: null,
            updatedOn: null,
            lucid: false,
            nightmare: false
        });
        if (props.dream) {
            dreamSubmit.value = props.dream;
        }

        const submitChanges = async() => {
            // todo: check for edit vs new

            const dateSubmitted = Date.now();

            if (!dreamSubmit.value.postedOn){
                dreamSubmit.value.postedOn = dateSubmitted;
            }
            dreamSubmit.value.updatedOn = dateSubmitted;
            dreamSubmit.value.dreamedOn = new Date(dreamSubmit.value.dreamedOn);
            console.log("DREAM SUBMITTED:");
            console.log(dreamSubmit.value);
            
            // put if making an edit
            if (dreamSubmit.value.id){
                await fetch("http://localhost:3000/dreams/" + dreamSubmit.value.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    body: JSON.stringify(dreamSubmit.value)
                }).then(response => {console.log("RESPONSE:", response)})

            } else { // post if making a new one
                await fetch("http://localhost:3000/dreams", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(dreamSubmit.value)
                }).then(response => {console.log("RESPONSE:", response)})
            }
            // redirect to dream page
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