function usernames(input){
	let arrays = new Map()
    for (let line of input) {
        let array = JSON.parse(line).map(Number).sort((a, b) => b - a);
        let toStore = `[${array.join(', ')}]`;
        if (!arrays.has(toStore))
            arrays.set(toStore, array.length);
    }

    console.log([...arrays.keys()].sort((a, b) => arrays.get(a) -arrays.get(b)).join('\n'));
}
usernames(['[-3, -2, -1, 0, 1, 2, 3, 4]',
'[10, 1, -17, 0, 2, 13]',
'[4, -3, 3, -2, 2, -1, 1, 0]'])

// let seqs = new Set();
//     for(let row of array) {
//         let arr = JSON.parse(row).map(Number).sort((a, b) => b - a);
//         let arrayToAdd = `[${arr.join(', ')}]`;
//         if(!seqs.has(arrayToAdd)) seqs.add(arrayToAdd);
//     }
//     let result = Array.from(seqs).sort((a,b) => {
//         let arrA = a.split(', ');
//         let arrB = b.split(', ');
//         return arrA.length - arrB.length;
//     });
//     result.forEach(arr => console.log(arr));