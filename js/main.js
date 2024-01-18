Vue.component('Note',{
    template:`
    <form>
        
    </form>
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
        <div id="column"></div>
        <div id="column"></div>
        <div id="column"></div>
    </div>
`,
    methods: {              
        addToCart() {
            this.$emit('add-to-cart',);
        },
    }
})

let todo = new Vue({
    el: '#todo',
    method: {
        updateCart(id) {
            
    }}        
})
