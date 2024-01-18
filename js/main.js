let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});

Vue.component("board", { 
   template:`
<div class="board">
   <form @submit.prevent="onSubmit">
   <label for="name">Заголовок</label> <input type="text" id="name" v-model="name"> 
   
   <label for="text1">Пункт1</label> <input type="text" id="text1" v-model="text1"> 
   <label for="text1">Пункт2</label> <input type="text" id="text1" v-model="text1"> 
   <label for="text1">Пункт3</label> <input type="text" id="text1" v-model="text1"> 
   <label for="text1">Пункт4</label> <input type="text" id="text1" v-model="text1"> 
   <label for="text1">Пункт5</label> <input type="text" id="text1" v-model="text1"> 
   
   <button type="submit" value="Submit">Create</button>
   </div>0

   <ul>
   <li class="error "v-for="error in errors">{{error}}</li>
   </ul>
   </div>
   <ul class="cards">
   <li v-for="card in column1"><card :name="card.name" :column=1 :block="blockOne" :card_id="card.card_id" :count_of_checked="card.count_of_checked" :points="card.points" @to-two="toColumnTwo" >   </card></li>
   </ul>
   </li>
   
   
   <li class="column">
   <ul>
   <li  v-for="card in column2"><card :name="card.name" :column=2 :block=false :card_id="card.card_id" :count_of_checked="card.count_of_checked" :points="card.points" @to-three="toColumnThree" @to-one="toColumnOne" >  ></card></li>
   </ul>
   </li>
   
   
   
   <li class="column">
   <ul>
   <li  v-for="card in column3"><card class="done_card" :name="card.name" :pblock=true :dat="card.dat" :column=3 :points="card.points" ></card></li>
   </ul>
   </li>
   
   
   </ul>
   <button
         v-on:click="Cleen()"
   >
     cleen
   </button>
   </div>
   `,
   data() {
    return{
        text1:[],
        text2:[],
        text3:[],

        allColumns:[],
        cards:[],

        name:null,
        text1:null,
        text1:null,
        text1:null,
        text1:null,
        text1:null,

        card_id:0,

    }
},

mounted(){
    if (localStorage.getItem('allColumns')) {
        try {
          this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
          this.text1 = this.allColumns[0]
          this.text2 = this.allColumns[1]
          this.text3 = this.allColumns[2]
          this.blockOne = this.allColumns[3]
        } catch(e) {
          localStorage.removeItem('allColumns');
        }
  }
},
watch:{
    text1(){
          this.allColumns = [this.text1,this.text2,this.text3, this.blockOne]
          




          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);


    },
    text2(){
          allColumns = [this.text1, this.text2, this.text3, this.blockOne]

          
          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);

    },
    text3(){
          allColumns = [this.text1, this.text2, this.text3, this.blockOne]

          
          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);


    },
},  

})