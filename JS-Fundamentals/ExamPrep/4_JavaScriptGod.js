function javaScript(input){
    let result = {}
    for(let line of input){
        let data = line.split(' & ')
        let task = 'Task ' + data[2]

        if(!result[task]){
            result[task] = {
            tasks: [],
            average: 0,
            lines: 0
        }
    }
        result[task].tasks.push({
        name: data[0],
        type: data[1]
        });
        result[task].average += Number(data[3]);
        result[task].lines += Number(data[4]);
    }

    Object.keys(result).forEach(function (key) {
        result[key].average = parseFloat((result[key].average / result[key].tasks.length).toFixed(2));
        result[key].tasks.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    });

    var keysSorted = Object.keys(result).sort(function (a, b) {
        if (result[a].average == result[b].average) {
            return result[a].lines - result[b].lines;
        }
        return result[b].average - result[a].average;
    });
    var sortedObject = {};
    keysSorted.forEach(function (el) {
        sortedObject[el] = result[el];
    });

	console.log(JSON.stringify(sortedObject));
}
javaScript(['Array Matcher & strings & 4 & 100 & 38',
'Magic Wand & draw & 3 & 100 & 15',
'Dream Item & loops & 2 & 88 & 80',
'Knight Path & bits & 5 & 100 & 65',
'Basket Battle & conditionals & 2 & 100 & 120',
'Torrent Pirate & calculations & 1 & 100 & 20',
'Encrypted Matrix & nested loops & 4 & 90 & 52',
'Game of bits & bits & 5 &  100 & 18',
'Fit box in box & conditionals & 1 & 100 & 95',
'Disk & draw & 3 & 90 & 15',
'Poker Straight & nested loops & 4 & 40 & 57',
'Friend Bits & bits & 5 & 100 & 81'])

	