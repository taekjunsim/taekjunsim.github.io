
#### 21.12.03.

- 생성자 함수와 Class의 차이

```
	// 생성자 함수와 class도 가독성 외에는 차이가 없는건가? 
	// 1. 호이스팅 발생 유무 (선언식은 호이스팅이 발생하지만 표현식은 호이스팅이 발생하지 않는다.)
	// 2. 가독성
	// 3. 그 외에도 많은 것 같은데....

{
	function Animal(name, age) {
		this.name = name;
		this.age = age;
	}

	// prototype으로 지정해주지 않으면 상속이 안된다.
	Animal.prototype.eat = function() {
		console.log(`Name is ${this.name}. He is ${this.age}`)
	};

	Animal.eat = function() {
		console.log('eating');
	}

	const Cat = new Animal('bee', 13);

	const Dog = new Animal('Ari', 10);

	Cat.eat(); // what

	Dog.eat();

	Animal.eat(); // eating
}

// ----------------------------------

// {
// 	class Animal {
// 		constructor(name) {
// 			this.name = name;
// 		}
		
// 		eat() {
// 			return 'eating';
// 		}
// 	}

// 	class Cat extends Animal {
// 		constructor(name, age) {
// 			super(name);
			
// 			this.age = age;
// 		}
		
// 		meow() {
// 			return 'meow';
// 		}
// 	}

// 	class Dog extends Animal {
// 		bowow() {
// 			return 'bowow';
// 		}
// 	}

// 	const cat = new Cat('bee', 13);
// 	const dog = new Dog();

// 	console.log(`Name is ${cat.name}. He is ${cat.age}`);
// 	console.log(dog.name);
// }

// // -------------------------------------------------

{
	let Rectangle = class {
		constructor(width, length) {
			this.length = length;
			this.width = width;
		}
	}

	class Cube extends Rectangle {
		constructor(width, length, height) {
			super(width, length);

			this.height = height;
		}

		calculateArea() {
			return this.width * this.length * this.height;
		}
	} 

	const cube = new Cube(10, 11, 12)

	console.log(cube.calculateArea());
}
```

#### 21.12.02.

- Styled Components

```
const Div = styled.div`
  css요소  
`;
```

```
const containerDiv = styled(Div)`
  css요소
`;
```
