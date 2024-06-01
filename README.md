# School Grading System
This Project basically have a contract of SchoolGradingSystem in which we can addStudent, removeStudent, updateGrade and can see grade of students in Blockchain. Program is written in Solidity version >=0.8.2 and have mapping between address and student(user-defined datatype) named Student have 3 events for updation of StudentAdded,StudentRemoved and GradeUpdated operations in blockchain and have 4 functions for addStudent, removeStudent, updateGrade and checkGrade operations. Also this is for demonstration of error handling using require(), assert() and revert() functions.

## Description
So, as mentioned before code has mapping, 3 events and 4 helper functions now get into its depth and know how the code is working.
Firstly, mapping students is mapping the student address with it's details stored in Student(user-defined datatype). After that 3 events are defined which update the operations add new Student, remove existing student and update grade in the blockchain. 
### In last 4 helper functions:
1). addStudent => It adds the data of new Student if not already exit and emit using StudentAdded event. It contains  assert() function which checks if the address is present in the blockchain and if not then revert and it will indicate a bug in the contract.
  
2). removeStudent => It removes the student data if present and emit using StudentRemoved event.It contains  require() function which checks if the address is present in the blockchain and if not then revert and display custom error.

3). updateGrade => It update the grade of a student if present and emit it using GradeUpdated event.It contains  require() function which checks if the address is present in the blockchain and if not then revert and display custom error.

4). checkGrade => It returns the grades of student at the provided address. It contains a revert function which revert custom error if condition is false;

## Getting Started

For the execution of our code we will be using VSCode ,

After cloning the repositry provided for environment create a new .sol file and start writing the project code.

### Executing program

```
code blocks for commands

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

contract SchoolGradingSystem {
    struct Student {
        // user-defined datatype
        string name;
        uint class;
        string grade;
    }

    // Mapping between address and user-defined datatype named Student
    mapping(address => Student) private students;
    // Array to store address for different students
    address[] private studentAddresses;

    // Events to implement changes in nodes 
    event StudentAdded(address indexed studentAddress, string name, uint class, string grade);
    event StudentRemoved(address indexed studentAddress);
    event GradeUpdated(address indexed studentAddress, string stuName, string oldGrade, string newGrade);

    // Function to add new Students data
    function addStudent(address _stuAddress, string memory _stuName, uint _class, string memory _grade) public {
        assert(bytes(students[_stuAddress].name).length == 0);
        // assert() -> If condition fails it will indicate a bug in the contract.

        students[_stuAddress] = Student(_stuName, _class, _grade);
        studentAddresses.push(_stuAddress);

        emit StudentAdded(_stuAddress, _stuName, _class, _grade);
    }

    // Function to remove students data 
    function removeStudent(address _stuAddress) public {
        require(bytes(students[_stuAddress].name).length != 0, "Student does not exist.");
        // require() -> revert if condition fails and display custom error message.

        delete students[_stuAddress];

        emit StudentRemoved(_stuAddress);
    }

    // Function to check student grades
    function checkGrades(address _stuAddress) public view returns (string memory name, uint class, string memory grade) {

        if(bytes(students[_stuAddress].name).length == 0){
            revert("Student does not exist.");
            // revert() -> revert the transaction and trigger an error with custom error message.
        }
        
        Student memory student = students[_stuAddress];
        return (student.name, student.class, student.grade);
    }

    // Function to update grades of existing student
    function updateGrades(address _stuAddress, string memory _newGrade) public {

        require(bytes(students[_stuAddress].name).length != 0, "Student does not exist.");
        // require() -> revert if condition fails and display custom error message.

        string memory stuName = students[_stuAddress].name;
        string memory oldGrade = students[_stuAddress].grade;
        students[_stuAddress].grade = _newGrade;

        emit GradeUpdated(_stuAddress, stuName, oldGrade, _newGrade);
    }
}

```
After writing the code it's time to compile and deploy it. Run provided steps in different terminal.

### Steps for compiling and deployment of program Code:
Command 1:
npm i -> Run it in the first terminal

Command 2:
npx hardhat node -> Run it in the second terminal

Command 3:
npx hardhat run --network localhost scripts/deploy.js -> run it in the third terminal

Command 4:
npx hardhat console --network localhost ->run this and upcoming steps in first terminal

Command 5:
const student = await (await ethers.getContractFactory("SchoolGradingSystem")).attach("0x5FbDB2315678afecb367f032d93F642f64180aa3") -> link the blockchain to program code

After performing these steps we can call helper functions in program code and can perform addStudent, removeStudent, updateStudent and checkGrade.

## Example for function calling : 
await student.addStudent("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "Rahul", 10, "A")

### Thanks for Reading
I hope you Understand the program Code and functioning well.
## Have a Nice Day !!!
