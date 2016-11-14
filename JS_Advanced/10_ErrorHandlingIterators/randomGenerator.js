function* random(val) {
	let start = val
	let next = (val * val) % (4871 * 7919)

	while (true) {
		val = next
		yield next % 100
		next = (val * val) % (4871 * 7919)
	}
}
let rnd = random(100);

for (let i = 0; i < 10; i++) {
  console.log(rnd.next().value);
}