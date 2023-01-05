import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [studentInfo, setstudentInfo] = useState({ rollno: "", name: "" });
    let initStudents = new Set();
    const [students, setStudents] = useState(initStudents);
    const [calcTxt, setCalcTxt] = useState(false);
    const txt = !calcTxt ? "Check" : "Clear";
    const clear = useRef(null);
    const toastCheckInRef = useRef(null);
    const toastCheckOutRef = useRef(null);
    const handleCheckIn = (e) => {
        e.preventDefault()
        const current = new Date();
        const checkInTime = current.toLocaleTimeString("en-US");
        studentInfo.checkInTime = checkInTime;
        setStudents(students.add(studentInfo));
        clear.current.click();
        toastCheckInRef.current.click();
    }
    const handleCheckOut = async(e) => {
        e.preventDefault();
        let newStudents = new Set();
        const forLoop = async () =>{
            for(let ele of students.values()){
                if(ele.rollno !== studentInfo.rollno){
                    newStudents.add(ele);
                }
            }
        }
        forLoop();
        setStudents(newStudents);
        toastCheckOutRef.current.click();
    }
    const handleChange = (event) => {
        setstudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
    }
    const handleClear = (e) => {
        e.preventDefault();
        setTimeout(() => {
            document.getElementById("rollno").value = "";
            document.getElementById("name").value = "";
        }, 500);
    }
    const handleCheckInToast = (e) => {
        e.preventDefault();
        toast.success(' You are successfully Checked in!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            draggable: false,
            progress: undefined,
        });
    }
    const handleCheckOutToast = (e) => {
        e.preventDefault();
        toast.success('You are successfully Checked Out!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            draggable: false,
            progress: undefined,
        });
    }
    const handleCalcTxt = () => {
        !calcTxt ? setCalcTxt(true) : setCalcTxt(false);
    }
    return (
        <>
            <div className="login">
                <form action="" className='loginForm'>
                    <div>
                        <label>Enter your Roll No</label>
                        <input type="text" name='rollno' id="rollno" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Enter your Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} />
                    </div>
                    <div className='btn'>
                        <button type="button" className="btn btn-outline-primary" onClick={handleCheckIn}>Check In</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleCheckOut}>Check Out</button>
                        <button className="button clear-btn" onClick={handleClear} ref={clear}>Check Out</button>
                        <button className="button toast" onClick={handleCheckInToast} ref={toastCheckInRef}></button>
                        <button type="button" className="button toast " onClick={handleCheckOutToast} ref={toastCheckOutRef}></button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
            <div className='container calc-container'>
                <h4 >Check Number of Students Present</h4>
                <div className='calc-btn-container'>
                    <button type="button" className="btn btn-outline-primary" onClick={handleCalcTxt}>{txt}</button>
                </div>
                {calcTxt && <h5 className='calc-txt' >{`The Number Of Students present are ${students.size}`} </h5>}
            </div>
        </>
    )
}

export default Login;