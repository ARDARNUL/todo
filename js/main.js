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
   <form >
   <label for="name">Заголовок</label> <input type="text" id="name" v-model="name"> 
   
   <label for="point1">Пункт1</label> <input type="text" id="point1" v-model="point1"> 
   <label for="point2">Пункт2</label> <input type="text" id="point2" v-model="point2"> 
   <label for="point3">Пункт3</label> <input type="text" id="point3" v-model="point3"> 
   <label for="point4">Пункт4</label> <input type="text" id="point4" v-model="point4"> 
   <label for="point5">Пункт5</label> <input type="text" id="point5" v-model="point5"> 
   
   <button type="submit" value="Submit">Create</button>
   </div>0

   </form>

   <ul>
   <li class="error</li>
   </ul>
   </div>
   <ul class="cards">
   <li></li>
   </ul>
   </li>
   
   
   <li class="column">
   <ul>
   <li></li>
   </ul>
   </li>
   
   
   
   <li class="column">
   <ul>
   <li</li>
   </ul>
   </li>
   
   
   </ul>
   <button></button>
</div>
   `,
})