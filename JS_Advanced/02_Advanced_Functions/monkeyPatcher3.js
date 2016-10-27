function votingSystem(action) {
    let that = this;
    let patcher = (function () {
        function upvote() {
            that.upvotes++;
        }

        function downvote() {
            that.downvotes++;
        }

        function calculateRating() {
            let totalVotes = that.upvotes + that.downvotes;
            if (totalVotes >= 10) {
                if (that.upvotes / totalVotes > 0.66) {
                    return 'hot';
                } else if (that.upvotes - that.downvotes >= 0 && (that.upvotes > 100 || that.downvotes > 100)) {
                    return 'controversial';
                } else if (that.upvotes - that.downvotes < 0) {
                    return 'unpopular';
                }
            }
            return 'new';
        }

        function score() {
            let up = that.upvotes;
            let down = that.downvotes;
            let totalScore = that.upvotes - that.downvotes;
            let rating = calculateRating();

            if (that.upvotes + that.downvotes > 50) {
                let additionalVotes = Math.ceil(0.25* (Math.max(that.upvotes, that.downvotes)));
                up = that.upvotes + additionalVotes;
                down = that.downvotes + additionalVotes;
            }
            return [up, down, totalScore, rating];
        }

        return {upvote, downvote, score};
    })();

    return patcher[action]();
}


function example() {
    let obj = {id: '3', author: 'emil', content: 'wazaaaaa', upvotes: 100, downvotes: 100};
    votingSystem.call(obj, 'downvote');
    votingSystem.call(obj, 'upvote');
    console.log(votingSystem.call(obj, 'score'));
    for (let i = 0; i < 50; i++) {
        votingSystem.call(obj, 'downvote');
    }

    console.log(votingSystem.call(obj, 'score'));
}

let obj = {id: '1', author: 'pesho', content: 'hi guys', upvotes: 101, downvotes: 99};

console.log(votingSystem.call(obj, 'score'));