function solve(input) {
    let matrix = []
    let directions = input.shift().split(', ')
    let moves = []
    let rowPos = 0
    let colPos = 0
    let result = {
            '&': 0,
            '*': 0,
            '#': 0,
            '!': 0,
            'wall hits': 0
        };
    for (let line of input) {
        matrix.push(line.split(', '));
    }
   
    directions.forEach(moveToDirection);

    console.log(JSON.stringify(result));
    console.log(moves.length > 0 ? moves.join('|') : 'no');

    function moveToDirection(direction) {
        if(direction == 'right') {
            if(colPos + 1 < matrix[rowPos].length) {
                colPos++;
                checkVegetable();
            } else {
                result['wall hits']++;
            }
        } else if(direction == 'left') {
            if(colPos - 1 >= 0) {
                colPos--;
                checkVegetable();
            } else {
                result['wall hits']++;
            }
        } else if(direction == 'up') {
            if(rowPos - 1 >= 0) {
                rowPos--;
                checkVegetable();
            } else {
                result['wall hits']++;
            }
        } else if(direction == 'down') {
            if(rowPos + 1 < matrix.length) {
                rowPos++;
                checkVegetable();
            } else {
                result['wall hits']++;
            }
        }
    }

    function checkVegetable() {
        matrix[rowPos][colPos] = matrix[rowPos][colPos].replace(/\{([&*!#])\}/g, function(match, group) {
            result[group] += 1;
            return '@';
        });
        moves.push(matrix[rowPos][colPos]);
    }
}
solve(['right, up, up, down',
'asdf, as{#}aj{g}dasd, kjldk{}fdffd, jdflk{#}jdfj',
'tr{X}yrty, zxx{*}zxc, mncvnvcn, popipoip',
'poiopipo, nmf{X}d{X}ei, mzoijwq, omcxzne'])

// solve(['up, right, left, down',
// 'as{!}xnk'])