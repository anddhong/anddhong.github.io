/*** Object Constructors ***/
function polarbear(name, age) {
  this.name = name;
  this.age = age;
  this.image = "static/polarbear.jfif";
  this.type = "polarbear";
}

function whale(name, age) {
  this.name = name;
  this.age = age;
  this.image = "static/whale.jpg"
  this.type = "whale";
}

function penguin(name, age) {
  this.name = name;
  this.age = age;
  this.image = "static/penguin.jpg"
  this.type = "penguin";
}

/*** Global Variables ***/
var animals = [new polarbear(), new whale(), new penguin()];
var names = ["Toothless", "Marshmallow", "Momo", "Coco", "Ollie", "Oscar", "Bella", "Ruby", "Apples"];

/*** Functions ***/
// get a random index for an array from 0 to maxIndex (not inclusive)
function getRandomIndex(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}

// generates either a Cat, Dog, or Bird with a random name and random age
function generateRandomAnimal() {
  var randomIdx = getRandomIndex(animals.length);
  var randomAnimal = animals[randomIdx];

  if (randomAnimal instanceof polarbear) 
  {
    return new polarbear(generateRandomName(), generateRandomAge());
  } 
  else if (randomAnimal instanceof whale) 
  {
    return new whale(generateRandomName(), generateRandomAge());
  } 
  else if (randomAnimal instanceof penguin) 
  {
    return new penguin(generateRandomName(), generateRandomAge());
  }
}

// generates a random name from list of names
function generateRandomName() {
  var randomIdx = getRandomIndex(names.length);
  return names[randomIdx];
}

// generates a random age from 0 to 5
function generateRandomAge() {
  var randomIdx = getRandomIndex(5);
  return randomIdx;
}

/*** Document Load ****/
function onLoad() {

  // generate a random animal when the document opens
  var animal = generateRandomAnimal();
  console.log(animal)
  // update the page based on the animal properties
  document.getElementById("animal-properties").textContent = animal.name + "  " + animal.age + " years old";
  document.getElementById("animal-img").setAttribute("src", animal.image)

};
