const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let people = [];

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addPeople() {
  console.log("Please enter the data for 10 people:");
  for (let i = 0; i < 10; i++) {
    console.log(`\nPerson ${i + 1}:`);
    const id = await askQuestion("ID: ");
    const firstName = await askQuestion("First Name: ");
    const lastName = await askQuestion("Last Name: ");
    const age = await askQuestion("Age: ");
    const city = await askQuestion("City: ");
    people.push({ id, firstName, lastName, age, city });
  }
}

function viewAllPeople() {
  if (people.length === 0) return console.log("No people to display.");
  console.log("\n--- All People ---");
  people.forEach(person => console.log(person));
}

function viewSpecificPerson(id) {
  const person = people.find(p => p.id === id);
  if (person) {
    console.log("\n--- Person Found ---");
    console.log(person);
  } else {
    console.log("Person not found.");
  }
}

function deleteAllPeople() {
  people = [];
  console.log("All people have been deleted.");
}

function deleteSpecificPerson(id) {
  const index = people.findIndex(p => p.id === id);
  if (index !== -1) {
    people.splice(index, 1);
    console.log("Person deleted.");
  } else {
    console.log("Person not found.");
  }
}

function viewNamesAndCities() {
  if (people.length === 0) return console.log("No people to display.");
  console.log("\n--- Full Names and Cities ---");
  people.forEach(p => {
    console.log(`Full Name: ${p.firstName} ${p.lastName}, City: ${p.city}`);
  });
}

async function mainMenu() {
  while (true) {
    console.log(`
----- MENU -----
1. Add 10 People
2. View All People
3. View Specific Person
4. Delete All People
5. Delete Specific Person
6. View Full Names & Cities
7. Exit
----------------
`);

    const choice = await askQuestion("Enter your choice: ");
    switch (choice) {
      case '1':
        await addPeople();
        break;
      case '2':
        viewAllPeople();
        break;
      case '3':
        const idToView = await askQuestion("Enter ID to view: ");
        viewSpecificPerson(idToView);
        break;
      case '4':
        deleteAllPeople();
        break;
      case '5':
        const idToDelete = await askQuestion("Enter ID to delete: ");
        deleteSpecificPerson(idToDelete);
        break;
      case '6':
        viewNamesAndCities();
        break;
      case '7':
        console.log("Exiting...");
        rl.close();
        return;
      default:
        console.log("Invalid choice. Try again.");
    }
  }
}

mainMenu();

