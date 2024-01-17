Vue.component('Note',{
    template:`
        <div id="infoCart">
            <img src=""></img>
            <input type="text" v-model="textCart" id="textCart" for="textCart" name="Name">
        </div>
    `,
    data(){
        return{
        textCart: []
        }
    },
    method:{
        saveCart(){
            localStorage.setItem("textCart", this.textCart);
            let searchCart = localStorage.getItem("textCart");
        }
    }
})

Vue.component('list',{
    template:`
    <div class="main">
        <div id="column">
            <Note></Note>
            <button class="new">+</button>
        </div>
        <div id="column"></div>
        <div id="column"></div>
    </div>
`,
})

let todo = new Vue({
    el: '#todo'
})
