let eventBus = new Vue()

Vue.component("task", {
    template: `
    <div class="task" 
        @click="check"
        :class="{done:done}">{{point}}</div>
    </div>
    `,
    data() {
        return{
            
        }
    },
    props:{
        point:{
            type: String,
            required:false,
        },
        done:{
            type: Boolean,
            required:false,
        },
        block:{
            type: Boolean,
            required:false,
        },       
        pblock:{
            tupe:Boolean,
            required:false
        }
    },
    methods:{
 check(){
        if(!this.done){
            if(!this.block){
                this.done=true
                this.$emit("checked",this.point);
            }
        }
    }
    }
});

Vue.component("card", {
    template: `
<div class="card">
    <h3>{{name}}</h3>
    <ul>
    <li v-for="point in countLabel"><task :block="block" :point="point[0]" :pblock="pblock" :done="point[1]" @checked="updatechecked" @updatetwo="updatetwo"></task></li>
    </ul>
    <p>{{dat}}</p>
</div>
    `,
    data() {
        return{
        }
    },
    methods: {

    updatechecked(point) {
        this.count_of_checked+=1;

        for(i in this.countLabel){
            if(this.countLabel[i][0]==point && this.countLabel[i][1] != true){
                this.countLabel[i][1] = true
                break
            }
        }    

        if ((this.count_of_tasks) == (this.count_of_checked)){
        var now = new Date() 
        now = String(now);
        console.log(this.name,this.countLabel,this.card_id,now)
        this.$emit("to-three",this.name,this.countLabel,this.card_id,now);
        }
        else if ((this.count_of_tasks/2) <= (this.count_of_checked)){
        this.$emit("to-two",this.name,this.countLabel,this.card_id, this.count_of_checked);
        }
    },
    updatetwo(point){
        this.count_of_checked-=1;
        if(this.column==2 || this.column==1){
            for(i in this.countLabel){
                if(this.countLabel[i][0]==point && this.countLabel[i][1] == true){
                    this.countLabel[i][1] = false
                    break
                }
            }
            if(this.column==2){
                if ((this.count_of_tasks/2) > (this.count_of_checked)){
                    this.$emit("to-one",this.name,this.countLabel,this.card_id, this.count_of_checked);

                    }
            }           
        }
    }
    },
    mounted() {
        eventBus.$on('checkOne',checks => {
            
        eventBus.$on('checkOne',checks => {
            this.count_of_checked = 0
            for(i in this.points){
                if(this.points[i][1] == true){
                    this.count_of_checked += 1
                }
            }    

            if ((this.count_of_tasks/2) <= (this.count_of_checked) && (this.count_of_tasks) != (this.count_of_checked)){
                console.log(this.name)
            this.$emit("to-two",this.name,this.points,this.card_id, this.count_of_checked);
        }
        })
    })
    },
    props:{
        name:{
            type:String,
            required:false,
        },
        countLabel:{
            type:Array,
            required:false,
        },
        card_id:{
            type:Number,
            required:false,
        },
        count_of_checked:{
            type:Number,
            required:false,
        },
        dat:{
            type:String,
            required:false,
        },
        block:{
            type:Boolean,
            required:false
        },
        column:{
            type:Number,
            required:false,
        },
        pblock:{
            tupe:Boolean,
            required:false
        }
        
    },
    computed: {
        count_of_tasks() {
          return this.countLabel.length;
        },
    }
});

Vue.component("board", { 
    template:`
 <div class="board">
     
 <div class="form">
 <form @submit.prevent="onSubmit">
 <label for="name">label</label> <input type="text" id="name" v-model="name"> 
 
 <label for="text1">label</label> <input class="input" type="text" id="text1" v-model="text1"> 
 <label for="text2">label</label> <input class="input" type="text" id="text2" v-model="text2"> 
 <label for="text3">label</label> <input class="input" type="text" id="text3" v-model="text3"> 
 <label for="text4">label</label> <input class="input" type="text" id="text4" v-model="text4"> 
 <label for="text5">label</label> <input class="input" type="text" id="text5" v-model="text5"> 
 
 <button type="submit" class="but" value="Submit">+</button>
 
 </form>
 
 <ul>
 <li class="error "v-for="error in errors">{{error}}</li>
 </ul>
 
  <button class="clear" v-on:click="Clear()">
      ClearAll!!!
  </button>
 
 </div>
 
     <ul  id="columns">
     <li  class="column">
    <ul class="cards">
    <li v-for="card in column1"><card :name="card.name" :column=1 :block="blockOne" :card_id="card.card_id" :count_of_checked="card.count_of_checked" :countLabel="card.countLabel" @to-two="columnTwo" >   </card></li>
    </ul>
    </li>
    
    
    <li class="column">
    <ul>
    <li  v-for="card in column2"><card :name="card.name" :column=2 :block=false :card_id="card.card_id" :count_of_checked="card.count_of_checked" :countLabel="card.countLabel" @to-three="columnThree"" >  ></card></li>
    </ul>
    </li>
    
    
    
    <li class="column">
    <ul>
    <li  v-for="card in column3"><card class="done_card" :name="card.name" :pblock=true :dat="card.dat" :column=3 :countLabel="card.countLabel" ></card></li>
    </ul>
    </li>
    
    
    </ul>
  </div>
    `,
    data() {
     return{
         column1:[],
         column2:[],
         column3:[],
 
         saveColumns:[],
         cards:[],
 
         countLabel:[],
         errors:[],
 
         name:null,
         text1:null,
         text2:null,
         text3:null,
         text4:null,
         text5:null,
 
         card_id:0,
 
         blockOne:false,
     }
 },
 
 mounted(){
     if (localStorage.getItem('saveColumns')) {
         try {
           this.saveColumns = JSON.parse(localStorage.getItem('saveColumns'));
           this.column1 = this.saveColumns[0]
           this.column2 = this.saveColumns[1]
           this.column3 = this.saveColumns[2]
           this.blockOne = this.saveColumns[3]
         } catch(e) {
           localStorage.removeItem('saveColumns');
         }
   }
 },
 watch:{
     column1(){
           this.saveColumns = [this.column1,this.column2,this.column3, this.blockOne]
           const parsed = JSON.stringify(this.saveColumns);
           localStorage.setItem('saveColumns', parsed);
 
 
     },
     column2(){
           saveColumns = [this.column1, this.column2, this.column3, this.blockOne]
 
           
           const parsed = JSON.stringify(this.saveColumns);
           localStorage.setItem('saveColumns', parsed);
 
     },
     column3(){
           saveColumns = [this.column1, this.column2, this.column3, this.blockOne]
 
           
           const parsed = JSON.stringify(this.saveColumns);
           localStorage.setItem('saveColumns', parsed);
 
 
     },
 },  
 methods:{
     onSubmit(){
         this.errors=[]
         this.countLabel=[]
         if(this.text1){
             this.countLabel.push([this.text1,false])
         }
         if(this.text2){
             this.countLabel.push([this.text2,false])
         }
         if(this.text3){
             this.countLabel.push([this.text3,false])
         }
         if(this.text4){
             this.countLabel.push([this.text4,false]) 
         }
         if(this.text5){
             this.countLabel.push([this.text5,false])
         }
         
         if(this.countLabel.length < 3){
             this.errors.push("Должно быть заполнено минимум 3 пункта")
         }
         if(!this.name){
             this.errors.push("Не введён заголовок")
         }
         if(this.column1.length >=3){
             this.errors.push("Достигнуто максимальное число карточек")                
         }
         if(this.blockOne){
             this.errors.push("Второй столбец переполнен")
         }
         if(this.errors.length==0){
             let info = {
                 name:this.name,
                 countLabel:this.countLabel,
                 card_id:this.card_id,
                 count_of_checked:0,
             }
             this.card_id +=1;
             this.column1.push(info)
 
         }
     },
    columnTwo(name,countLabel, card_id,count_of_checked){
         if(this.column2.length==5){
             this.blockOne = true;
         }
         else{
             let info = {
                 name:name,
                 countLabel:countLabel,
                 card_id:card_id,
                 count_of_checked:count_of_checked
             }
             for(i in this.column1){
                 
                 if(this.column1[i].card_id==card_id){
                     this.column1.splice(i, 1)
                     break
                 }
             }
 
             this.column2.push(info)
         }
         let checks = 1;
         eventBus.$emit('checkTwo',checks)
 
     },
     columnThree(name,countLabel, card_id,now){
         let info = {
             name:name,
             countLabel:countLabel,
             card_id:card_id,
             dat:now,
         }
         for(i in this.column2){
             
             if(this.column2[i].card_id==card_id){
                 this.column2.splice(i, 1)
                 break
             }
         }
 
         this.column3.push(info)
         this.blockOne =false;
         let checks = 1;
         eventBus.$emit('checkOne',checks)
     },
     Clear(){
         this.column1=[],
         this.column2=[],
         this.column3=[],
         this.dat=[],
         this.blockOne= false
 
   },
     }
 })

let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});
