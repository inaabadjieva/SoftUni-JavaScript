function  extractSequence(input) {
    input = input.map(Number)
    let arr = []
    let biggest = Number.NEGATIVE_INFINITY
    input.forEach(function(e){       
       if (e >= biggest){
           arr.push(e)
           biggest = e
       }
   })
   arr.forEach(e => console.log(e))
}
extractSequence(['1',
'3',
'8',
'4',
'10',
'12',
'3',
'2',
'24'])