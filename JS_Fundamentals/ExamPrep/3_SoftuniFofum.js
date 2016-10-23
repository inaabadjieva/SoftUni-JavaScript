function forum(input){	
	let banList = input.pop().split(' ');
    var text = input.join('\n');

    let codePattern = /<code>[\s\S]+?<\/code>/g;
    let codeBlocks = [];
    let matchingCode;
    while (matchingCode = codePattern.exec(text)) {
        let codeBlock = matchingCode[0];
        let codeReplacer = new Array(codeBlock.length).join('#');
        text = text.replace(codeBlock, codeReplacer);
        codeBlocks.push({
            original: codeBlock,
            replacedWith: codeReplacer
        });
    }

    banList.forEach(function (entry) {
        let censoredUserPattern = new RegExp('(#\\b' + entry + ')\\b', 'g');
        let match;

        while (match = censoredUserPattern.exec(text)) {	
            let censoredName = match[1];
            let replacer = new Array(censoredName.length).join('*');
            text = text.replace(censoredName, replacer);
        }
    });

    let validUserPattern = /#(\b[a-zA-Z][\w\-]+[a-zA-Z0-9]\b)/g;
    let linkOpeningTag = '<a href="/users/profile/show/';
    let linkClosingTag = '</a>';
    text = text.replace(validUserPattern, linkOpeningTag + '$1">$1' + linkClosingTag);

    codeBlocks.forEach(function (codeBlock) {
        text = text.replace(codeBlock.replacedWith, codeBlock.original);
    });

    console.log(text);
}

forum(['Far far away, behind the word mountains,',
'far from the countries #Vokalia and Consonantia,',
'there live the #blind texts. Separated they #live in Bookmarksgrove',
'right at the coast of the Semantics, a large language ocean.',
'A #small #river named #Duden flows by their place and supplies',
'it with the necessary regelialia. It is a paradisematic country,',
'in which roasted parts of sentences fly into your mouth.',
'Even the all-powerful #Pointing has no control about the blind texts',
'it is an almost unorthographic life One day however a small line of blind',
'text by the name <code> of Lorem Ipsum #decided to </code>',
'leave for the far World of Grammar.',
'The Big #Oxmox advised her',
'not to do so, because there were thousands of bad Commas,',
'wild Question Marks and devious Semikoli,',
'but the Little Blind Text didn\'t listen.',
'small river Vokalia'])