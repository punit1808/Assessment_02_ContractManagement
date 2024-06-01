# School Grading System
This Project basically have a contract of SchoolGradingSystem in which we are implementing the contract and displaying the data on frontend using 'React' ,'Ether' library of javaScript and authenticating using Metamask Account.

## Description

Contract have 4 helper function by which complete logic of code is defined.

1). addStudent => It adds the data of new Student if not already exit and emit using StudentAdded event. It contains  assert() function which checks if the address is present in the blockchain and if not then revert and it will indicate a bug in the contract.
  
2). removeStudent => It removes the student data if present and emit using StudentRemoved event.It contains  require() function which checks if the address is present in the blockchain and if not then revert and display custom error.

3). updateGrade => It update the grade of a student if present and emit it using GradeUpdated event.It contains  require() function which checks if the address is present in the blockchain and if not then revert and display custom error.

4). checkGrade => It returns the grades of student at the provided address. It contains a revert function which revert custom error if condition is false;

Frontend complete code is written in index.js file using react libraries like reactstrap, bootstrap, ethers, etc.

## Getting Started

For the execution of our code we will be using VSCode and Web Browser,

After cloning the repositry provided for environment start writing the project code.

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
npx hardhat node -->Network in Metamask should be created using link provided and data will be updated in nodes after function calling.

Command 2:
npx hardhat run --network localhost scripts/deploy.js 

Command 3:
npm run dev  --> Launch Frontend on WebBrowser.

After these commands we can access data on WebBrowser at http://localhost:3000/ .
For performing operations MetaMask Account should be already setup and localHost Network should be created using node link.

Now we can perform our contract functions i.e. addStudent, removeStudent, checkGrade, updateGrade after authenticating from our Metamask account.


### Thanks for Reading
I hope you Understand the program Code and functioning well.
## Have a Nice Day !!!
