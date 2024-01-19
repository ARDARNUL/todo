Vue.component("task", {
    template: `
<div class="task" 
@click="check"
:class="{done:done}">{{point}}</div>
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
<ul >
<li v-for="point in points"><task :block="block" :point="point[0]" :done="point[1]" @checked="updatechecked"></task></li>
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

        for(i in this.points){
            if(this.points[i][0]==point && this.points[i][1] != true){
                this.points[i][1] = true
                break
            }
        }    

        if ((this.count_of_tasks) == (this.count_of_checked)){
        var now = new Date() 
        now = String(now);
        this.$emit("to-three",this.name,this.points,this.card_id,now);
        }
        else if ((this.count_of_tasks/2) <= (this.count_of_checked)){
        this.$emit("to-two",this.name,this.points,this.card_id, this.count_of_checked);
        }
    }
    },
    mounted() {
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
    },
    props:{
        name:{
            type:String,
            required:false,
        },
        points:{
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
        }
        
    },
    computed: {
        count_of_tasks() {
          return this.points.length;
        },
    }
});

let eventBus = new Vue()

Vue.component("board", {
    template: `
    
<div class="board">

<ul  id="columns">
<div class="form">
<form @submit.prevent="onSubmit">
<label for="name">Заголовок</label> <input type="text" id="name" v-model="name"> 

<label for="text1">Пункт1</label> <input type="text" id="text1" v-model="text1"> 
<label for="text2">Пункт2</label> <input type="text" id="text2" v-model="text2"> 
<label for="text3">Пункт3</label> <input type="text" id="text3" v-model="text3"> 
<label for="text4">Пункт4</label> <input type="text" id="text4" v-model="text4"> 
<label for="text5">Пункт5</label> <input type="text" id="text5" v-model="text5"> 

<button type="submit" value="Submit">Создать</button>


</form>

<ul>
<li class="error "v-for="error in errors">{{error}}</li>
</ul>
</div>
<li  class="column">
<ul class="cards">
<li v-for="card in column1"><card :name="card.name" :block="blockOne" :card_id="card.card_id" :count_of_checked=0 :points="card.points" @to-two="toColumnTwo" >   </card></li>
</ul>
</li>


<li class="column">
<ul>
<li  v-for="card in column2"><card :name="card.name" :block=false :card_id="card.card_id" :count_of_checked="card.count_of_checked" :points="card.points"   @to-three="toColumnThree"></card></li>
</ul>
</li>



<li class="column">
<ul>
<li v-for="card in column3"><card :name="card.name" :dat="card.dat" :points="card.points" ></card></li>
</ul>
</li>


</ul>
<button class="clear"
      v-on:click="clear()"
>
  cleen
</button>
</div>
    `,
    data() {
        return{
            column1:[],
            column2:[],
            column3:[],

            allColumns:[],
            cards:[],

            name:null,
            text1:null,
            text2:null,
            text3:null,
            text4:null,
            text5:null,
            
            points:[],

            errors:[],

            card_id:0,

            blockOne:false,
        }
    },
    mounted(){
            if (localStorage.getItem('allColumns')) {
                  try {
                    this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
                    this.column1 = this.allColumns[0]
                    this.column2 = this.allColumns[1]
                    this.column3 = this.allColumns[2]
                    this.blockOne = this.allColumns[3]
                  } catch(e) {
                    localStorage.removeItem('allColumns');
                  }
            }
    },
    watch:{
        column1(){
              this.allColumns = [this.column1,this.column2,this.column3, this.blockOne]
              
  
  
  
  
              const parsed = JSON.stringify(this.allColumns);
              localStorage.setItem('allColumns', parsed);
  
  
        },
        column2(){
              allColumns = [this.column1, this.column2, this.column3, this.blockOne]
  
              
              const parsed = JSON.stringify(this.allColumns);
              localStorage.setItem('allColumns', parsed);
  
        },
        column3(){
              allColumns = [this.column1, this.column2, this.column3, this.blockOne]
  
              
              const parsed = JSON.stringify(this.allColumns);
              localStorage.setItem('allColumns', parsed);
  
  
        },
  },  
    methods:{
        onSubmit(){
            this.errors=[]
            this.points=[]
            if(this.text1){
                this.points.push([this.text1,false])
            }
            if(this.text2){
                this.points.push([this.text2,false])
            }
            if(this.text3){
                this.points.push([this.text3,false])
            }
            if(this.text4){
                this.points.push([this.text4,false])
            }
            if(this.text5){
                this.points.push([this.text5,false])
            }
            
            if(this.points.length < 3){
                this.errors.push("Должно быть заполнено от 3 пунктов")
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
                    points:this.points,
                    card_id:this.card_id
                }
                this.card_id +=1;
                this.column1.push(info)

            }



        },
        toColumnTwo(name,points, card_id,count_of_checked){
            // console.log(name,points)
            // console.log(points)
            // console.log(count_of_checked)
            if(this.column2.length==5){
                this.blockOne = true;
            }
            else{
                let info = {
                    name:name,
                    points:points,
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

        },
        toColumnThree(name,points, card_id,now){
            let info = {
                name:name,
                points:points,
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
        clear(){
            this.column1=[],
            this.column2=[],
            this.column3=[],
            this.dat=[],
            this.blockOne= false

      },
    }
});



let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});