# React Frontend 

import React, { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import schoolGradingABI from "../artifacts/contracts/Assessment.sol/SchoolGradingSystem.json";
import "bootstrap/dist/css/bootstrap.min.css";
import NewForm from "./newStudentForm";
import NewForm2 from "./removeStudentForm";
import NewForm3 from "./checkGradeForm";
import NewForm4 from "./updateGradeForm";
import { Row , Col } from 'reactstrap';

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});

  const [stuModal, setStuModal] = useState(false);
  const [stuInfo, setStuInfo] = useState({});

  const [stuModal2, setStuModal2] = useState(false);
  const [stuInfo2, setStuInfo2] = useState({});

  const [stuModal3, setStuModal3] = useState(false);
  const [stuInfo3, setStuInfo3] = useState({});
                          
  const [stuModal4, setStuModal4] = useState(false);
  const [stuInfo4, setStuInfo4] = useState({});

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = schoolGradingABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };


  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    setContract(contractInstance);
  };

  const addStudent = async (stuAddress, stuName, stuClass, stuGrade) => {
    if (contract) {
      const tx = await contract.addStudent(stuAddress, stuName, stuClass, stuGrade);
      await tx.wait();
      alert("Student added successfully");
    }
  };

  useMemo(() => {
    console.log(stuInfo.name);
    console.log(stuInfo.address);
    console.log(stuInfo.class);
    console.log(stuInfo.grade);
    addStudent(stuInfo.address,stuInfo.name,stuInfo.class,stuInfo.grade);
  },[stuInfo])

  const removeStudent = async (removeAddress) => {
    if (contract) {
      const tx = await contract.removeStudent(removeAddress);
      await tx.wait();
      alert("Student removed successfully");
    }
  };

  useMemo(() => {
    removeStudent(stuInfo2.address);
  },[stuInfo2])

  const checkGrades = async (studentAddress) => {
    if (contract) {
      const [name, classNum, grade] = await contract.checkGrades(studentAddress);
      setStudentInfo({ name, class: classNum.toNumber(), grade });
    }
  };

  useMemo(() => {
    checkGrades(stuInfo3.address);
  },[stuInfo3])

  const updateGrades = async (studentAddress,NewGrade) => {
    if (contract) {
      const tx = await contract.updateGrades(studentAddress, NewGrade);
      await tx.wait();
      alert("Grade updated successfully");
    }
  };

  useMemo(() => {
    updateGrades(stuInfo4.address,stuInfo4.NewGrade);
  },[stuInfo4])

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this application.</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>
    }

    return (
      <div style={{padding: "20px", backgroundColor: "grey"}}>
        <p>Your Account: {account}</p>
        <p>Student Information: {JSON.stringify(studentInfo)}</p>
          <Row>
            <Col md={3}>
              <button style={{width: "60%", backgroundColor: "rgb(218, 215, 215)" ,borderRadius: "5px"}} onClick={() => setStuModal(true)}>Add Student</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal2(true)}>Remove Student</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal3(true)}>Check Grades</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal4(true)}>Update Grades</button>
            </Col>
          </Row>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container" style={{backgroundColor: "rgb(218, 215, 215)", width: "100vw"}}>
      <header><h1>School Grading System</h1></header>
      {initUser()}
      { stuModal && (
        <NewForm stuModal={stuModal} setStuModal={setStuModal} stuInfo={stuInfo} setStuInfo={setStuInfo} />)
      }
      { stuModal2 && (
        <NewForm2 stuModal2={stuModal2} setStuModal2={setStuModal2} stuInfo2={stuInfo2} setStuInfo2={setStuInfo2}/>)
      }
      { stuModal3 && (
        <NewForm3 stuModal3={stuModal3} setStuModal3={setStuModal3} stuInfo3={stuInfo3} setStuInfo3={setStuInfo3}/>)
      }
      { stuModal4 && (
        <NewForm4 stuModal4={stuModal4} setStuModal4={setStuModal4} stuInfo4={stuInfo4} setStuInfo4={setStuInfo4}/>)
      }
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
