function filterMatrix(input){
    let length = Number(input.pop());
    let sequence = input.join(' ').split(' ');

   let count = 1;
   for (let i = 0; i < sequence.length; i++) {
       if (sequence[i] === sequence[i + 1]) {
           count++;
           if (count == length) {
               for (let j = i + 1; j > i + 1 - length; j--) {
                   sequence[j] = -1;
               }
               count = 1;
           }
       } else {
           count = 1;
       }
   }

   let resultArr = [];
   let index = -1;
   for (i = 0; i < input.length; i++) {
       let currentRow = input[i].split(' ');
       let outputRow = [];
       for (let j = 0; j < currentRow.length; j++) {
           if (sequence[++index] !== -1) {
               outputRow.push(sequence[index]);
           }
       }
       resultArr.push(outputRow);
   }

   while(resultArr.length > 0) {
       let row = resultArr.shift();
       if (row.length > 0) {
           console.log(row.join(' '));
       } else {
           console.log('(empty)');
       }
   }
}
filterMatrix(['1 2 3 3',
							'3 5 7 8',
							'3 2 2 1',
							'3'])
filterMatrix(['2 1 1 1',
							'1 1 1',
							'3 7 3 3 1',
							'2'])