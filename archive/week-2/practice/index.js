// class Rectangle {
//   constructor(width, height, color) {
//     this.width = width;
//     this.height = height;
//     this.color = color;
//   }

//   area() {
//     const area = this.width * this.height;
//     return area;
//   }

//   paint() {
//     console.log(`Painting with colour ${this.color}`);
//   }
// }

// const rect = new Rectangle(2, 4, "blue"); // instance or object
// rect.paint();
// const area = rect.area();
// console.log(area);

class Shape {
  constructor(color) {
    this.color = color;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

  area() {
    throw new Error("this method should be called from subclass");
  }
  getDescription() {
    return `A shape with color ${this.color}`;
  }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color); // Call the parent class constructor to set the color. Call super before accessing 'this'.
    this.width = width;
    this.height = height;
  }

  area() {
    const area = this.width * this.height;
    return area;
  }

  getDescription() {
    return `A rectangle with width ${this.width}, height ${this.height}, and color ${this.color}`;
  }
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }

  getDescription() {
    return `A circle with radius ${this.radius}, and color ${this.color}`;
  }
}

const circle = new Circle(4, "blue");
const areaCircle = circle.area();
console.log(areaCircle);
console.log(circle.getDescription());
circle.paint();

const rectangle = new Rectangle(4, 5, "red");
const areaRectangle = rectangle.area();
console.log(areaRectangle);
console.log(rectangle.getDescription());
rectangle.paint();

const date = new Date();
console.log(date);

const map = new Map();
map.set("name", "Alice");
map.set("age", 24);
const firstName = map.get("name");
console.log(firstName);
