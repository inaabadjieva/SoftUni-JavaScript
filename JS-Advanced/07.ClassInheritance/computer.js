function result(){
	class ComputerPart{
		constructor(manufacturer){
			if(new.target === ComputerPart){
				throw new Error('Error')
			}
			this.manufacturer = manufacturer
		}
	}
	class Keyboard extends ComputerPart{
		constructor(manufacturer, responseTime){
			super(manufacturer)
			this.responseTime = responseTime
		}
	}
	class Monitor extends ComputerPart{
		constructor(manufacturer, width, height){
			super(manufacturer)
			this.width = width
			this.height = height
		}
	}
	class Battery extends ComputerPart{
		constructor(manufacturer, expectedLife){
			super(manufacturer)
			this.expectedLife = expectedLife
		}
	}
	class Computer extends ComputerPart{
		constructor(manufacturer, processorSpeed, ram, hardDiskSpace){
			if(new.target === Computer){
				throw new Error('Error')
			}
			super(manufacturer)
			this.processorSpeed = processorSpeed
			this.ram = ram
			this.hardDiskSpace = hardDiskSpace
		}
	}
	class Laptop extends Computer{
		constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
			super(manufacturer, processorSpeed, ram, hardDiskSpace)
			this.weight = weight
			this.color = color
			this.battery = battery
		}
		get battery(){
			return this._battery
		}
		set battery(input){
			if(!(input instanceof Battery)){
				throw new TypeError
			} else {
				this._battery = input
			}
		}
	}

	class Desktop extends Computer{
		constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
			super(manufacturer, processorSpeed, ram, hardDiskSpace)
			this.keyboard = keyboard
			this.monitor = monitor
		}
		get keyboard(){
			return this._keyboard
		}
		set keyboard(input){
			if(!(input instanceof Keyboard)){
				throw new TypeError
			} else {
				this._keyboard = input
			}
		}
		get monitor(){
			return this._monitor
		}
		set monitor(input){
			if(!(input instanceof Monitor)){
				throw new TypeError
			} else {
				this._monitor = input
			}
		}
	}

 	return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}

let classes = result();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy',3);
let laptop = new Laptop("Hewlett Packard",2.4,4,0.5,3.12,"Silver",battery);
console.log(laptop);
let battery2 = new Battery('Energy2',3);
laptop.battery = battery2
console.log(laptop);
