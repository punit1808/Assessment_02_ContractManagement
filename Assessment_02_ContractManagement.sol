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
