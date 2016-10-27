let result = (function () {
     let post = {
        id: 'Яни',
        author: '',
        content: '',
        upvotes: 0,
        downvotes: 0,
    };

    function calculateRating (upvotes, downvotes, totalVotes, score) {
        if (totalVotes >= 10) {
            if (upvotes / totalVotes > 0.66) {
                return 'hot';
            } else if (score >= 0 && (upvotes > 100 || downvotes > 100)) {
                return 'controversial';
            } else if (upvotes - downvotes < 0) {
                return 'unpopular';
            }
        }

        return 'new';
    }

    function score () {
        let totalVotes = post.upvotes + post.downvotes;
        let upvotes = post.upvotes;
        let downvotes = post.downvotes;
        let score = upvotes - downvotes;
        let rating = calculateRating(upvotes, downvotes, totalVotes, score);


        if (totalVotes > 50) {
            let numberToAddToVotes = Math.ceil(Math.max(post.upvotes, post.downvotes) * 0.25);
            upvotes += numberToAddToVotes;
            downvotes += numberToAddToVotes;
        }

        return [upvotes, downvotes, score, rating];
    }

    function upvote () {
        post.upvotes++;
    }

    function downvote () {
        post.downvotes++;
    }

    function call (postObject, command) {
        if (post.id === 'Яни') {
            post.id = postObject.id;
            post.author = postObject.author;
            post.content = postObject.content;
            post.upvotes = postObject.upvotes;
            post.downvotes = postObject.downvotes;
        }

        switch (command) {
            case 'upvote':
                upvote();
                break;
            case 'downvote':
                downvote();
                break;
            case 'score':
                return score();
        }
    }

    return {
        call: (inputObj, command) => call(inputObj, command)
    };
})();


var forumPost = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};


result.call(forumPost, 'upvote');
result.call(forumPost, 'downvote');

var answer = result.call(forumPost, 'score');
console.log(answer);

// for (let i = 0; i < 50; i++) {
//     result.call(forumPost, 'downvote');
// }

// answer = result.call(forumPost, 'score');

// console.log(answer);
// expected = [139, 189, -50, 'unpopular'];