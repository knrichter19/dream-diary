<template>
<div class="editWrapper">
    <div class="editPane">
        <h3>Title:</h3>
        <input class="editTitle" name="title" v-model="title" type = "Text" required>
        <div class="flex-center">
            <label for="dreamedOn">Date dreamed:</label>
            <input type="date" name="dreamedOn" v-model="dreamedOn">
        </div>
        <h3>Content:</h3>
        <textarea name="body" v-model="body" required>Enter Dream Info Here</textarea>
        <div class="flex-center">
            <input type="checkbox" id="checkLucid" name="checkLucid" value="lucid" v-model="lucid">
            <label for="checkLucid">Lucid?</label>
            <input type="checkbox" id="checkNightmare" name="checkNightmare" value="nightmare" v-model="nightmare">
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
    setup(){

        const title = ref("Title");
        const body = ref("");
        const dreamedOn = ref(null);

        const lucid = ref(false);
        const nightmare = ref(false);

        const submitChanges = async() => {
            // todo: check for edit vs new
            let dream = {
                author: "Katya",
                title: title.value,
                body: body.value,
                dreamedOn: new Date(dreamedOn.value), // todo: make work with time zones :/
                postedOn: new Date(Date.now()),
                updatedOn: new Date(Date.now()),
                lucid: lucid.value,
                nightmare: nightmare.value
            }
            console.log("DREAM SUBMITTED:");
            console.log(dream);
            // post to api
            // redirect to dream page
        }

        return {
            submitChanges,
            title, body, dreamedOn, lucid, nightmare
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