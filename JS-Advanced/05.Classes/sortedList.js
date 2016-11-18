class SortedList {
   constructor(items){
       this.items = []
       this.size = 0
   }
   add(elem){
       this.items.push(elem)
       this.size++
       this._sort()
    }
   remove(index){
       if(index > -1 && index < this.items.length){
           this.items.splice(index, 1)
           this.size--      
       }
       this._sort()
   }
   get(index){
       if(index >= 0 && index < this.items.length){
           return this.items[index]  
       }
   }
   _sort(){
       return this.items.sort((a,b) => a - b)
   }
}

    