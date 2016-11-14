class MailBox {
	constructor() {
		this.mailbox = []
	}
	addMessage(subject, text) {
		this.mailbox.push({
			subject: subject,
			text: text
		})
		return this
	}
	get messageCount() {
		return this.mailbox.length
	}
	deleteAllMessages() {
		this.mailbox = []
	}
	findBySubject(substr) {
		let result = []
		this.mailbox.forEach(function(element, index) {
			if (element.subject.includes(substr)) {
				result.push(element)
			}
		});
		return result
	}
	toString() {
		let output = ''
		if (this.mailbox.length === 0) {
			output = ` * (empty mailbox)`
		} else {
			this.mailbox.forEach(e => output += ` * [${e.subject}] ${e.text}\n`)
		}
		return output.trimRight()
	}
}
let mb = new MailBox();
// console.log("Msg count: " + mb.messageCount);
// console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
//console.log("Msg count: " + mb.messageCount);
//console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
	JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
	JSON.stringify(mb.findBySubject('ee')));

// mb.deleteAllMessages();
// console.log("Msg count: " + mb.messageCount);
// console.log('Messages:\n' + mb);

// console.log("New mailbox:\n" +
//     new MailBox()
//         .addMessage("Subj 1", "Msg 1")
//         .addMessage("Subj 2", "Msg 2")
//         .addMessage("Subj 3", "Msg 3")
//         .toString());
