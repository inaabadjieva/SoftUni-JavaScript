function solve(input) {
    let maxJumps = Number(input.shift())
    let trackLength = Number(input.shift())
    let flees = []
   	let tribunes = '#'.repeat(trackLength)
    let track = []
    let winner
    let fleeCount = 0

    for (let line of input) {
        let fleeInfo = line.split(/[, ]+/g);
        flees.push({
            initial: fleeInfo[0].substr(0,1).toUpperCase(),
            name: fleeInfo[0],
            jumpDistance: Number(fleeInfo[1]),
            index: 0,
            trackIndex: fleeCount
        });

        let fleeTrack = Array.apply(null, new Array(trackLength)).map(function() { return '.'; });

        fleeTrack[0] = fleeInfo[0].substr(0,1).toUpperCase();
        track.push(fleeTrack);
        fleeCount++;
    }
   
    for (i = 0; i < maxJumps; i++) {
        let hasFinished = false;
        flees.every(function(flee) {
            if(flee.index + flee.jumpDistance >= trackLength - 1) {
                hasFinished = flee;
                track[flee.trackIndex][flee.index] = '.';
                track[flee.trackIndex][track[flee.trackIndex].length-1] = flee.initial;
                return false;
            } else {
                track[flee.trackIndex][flee.index] = '.';
                track[flee.trackIndex][flee.index + flee.jumpDistance] = flee.initial;
                flee.index += flee.jumpDistance;
                return true;
            }
        });

        if(hasFinished) {
            winner = hasFinished;
            break;
        }
    }

    console.log(tribunes);
    console.log(tribunes);
    track.forEach(function(fleeTrack) {
        console.log(fleeTrack.join(''));
    });
    console.log(tribunes);
    console.log(tribunes);
    if(!winner) {
        var maxPos = 0;
        flees.forEach(function(flee) {
            if(flee.index >= maxPos) {
                maxPos = flee.index;
                winner = flee;
            }
        })
    }
    console.log('Winner: ' + winner.name);
}

solve(['3',
'5',
'cura, 1',
'Pepi, 1',
'UlTraFlea, 1',
'BOIKO, 1'])
solve(['3',
'40',
'S, 5',
'L, 1',
'O, 7',
'C, 3',
'H, 10',
'A, 12',
'I, 5',
'N, 8',
'O, 0',
'S, 6'])
// solve(['1',
// '1',
// 'pesho, 1',
// 'gosho, 1'])
// racing(['1',
// '3',
// 'pesho, 1',
// 'gosho, 2'])