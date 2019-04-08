let sl = document.getElementsByClassName('search');
let p = new Vue({
  el: '#selected-input',
  data: {
    selectItem: [],
    input:  '',
    search: [
      {message: 'узи малого таза (трансабдоминально)', id: 1},
      {message: 'узи брюшной полости (и почек)', id: 0},
      {message: 'узи надпочечников', id: 2},
      {message: 'узи почек (и надпочечников)', id: 3},
      {message: 'узи почек (лежа и стоя)', id: 4},
      {message: 'узи функции желчного пузыря ', id: 5},
      {message: 'узи функции желчного пузыря (сократительной)', id: 6},
    ],
    arr: [],
  },
  methods: {
    returnList(inputLength){

        for(let i = 0; i < this.search.length; i++){
          if(this.search[i].message.indexOf(this.input,0) == 0){
            this.arr.push(this.search[i]);
          }
        }
        if(this.arr.length == 0){
          document.getElementsByClassName('notFound')[0].classList.remove('hidden');
          return;
        }
        this.arr.sort(this.byField('message'));
        sl[0].style.display = 'block'
    },
    byField(field) {
      return function(a, b) {
        return a[field] > b[field] ? 1 : -1;
      }
    },
    addItem(id, message){
      this.selectItem.push({message: message, id: id});
      this.search.forEach(function(item, index, object){
        if(item.id == id){
          object.splice(index, 1);
        }
      });
      this.arr.forEach(function(item, index, object){
        if(item.id == id){
          object.splice(index, 1);
        }
      });
      if(this.arr.length == 0){
        sl[0].style.display = 'none'
      }
    },
    delItem(item){
      let id = item.id;
      let message = item.message;
      this.search.push({message: message, id: id});
      this.arr.push({message: message, id: id});
      this.selectItem.forEach(function(item, index, object){
        if(item.id == id){
          object.splice(index, 1);
        }
      });
      this.arr.sort(this.byField('message'));
    }
  },
  watch: {
    input: function () {
      document.getElementsByClassName('notFound')[0].classList.add('hidden');
      this.arr = [];
      let loading =  document.getElementsByClassName('loading')[0];
      let inputLength = this.input.length;
      if(inputLength > 2){
        this.returnList(inputLength);
        loading.classList.add('hidden');
      }else if(inputLength != 0){
        loading.classList.remove('hidden');
      }else {
        loading.classList.add('hidden');
        sl[0].style.display = 'none';
      }
    }
  },
 })
