function* fibonacci() {
	let current = 1
	let a = 1
	let b = 1
	yield 1

	while (true) {
		current = b
		yield current

		b = a + b
		a = current
	}
}
let fib = fibonacci();
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
