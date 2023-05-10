import React, { useState } from 'react';
import './style.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Faculty() {
  const [captcha, setCaptcha] = useState('');
  const [code, setCode] = useState('');
  const [codeDisplay, setCodeDisplay] = useState('No code generated yet');
  const [events, setEvents] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false); // new state variable

  function generateCaptcha() {
    const newCaptcha = generateRandomCaptcha();
    setCaptcha(newCaptcha);
  }

  function handlelogout(){
    window.location.reload();
  }

  function generateRandomCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  function generateCode() {
    if (isFormValid && captcha === document.getElementById("captchaDisplay").textContent) {
      const newCode = generateRandomCode();
      setCode(newCode);
      setCodeDisplay(newCode);
  
      // Create a new event with the generated code, subject, and timeslot
      const subject = document.getElementById("subject").value;
      const timeSlot = document.getElementById("time").value;
      const newEvent = {
        title: `${subject} - ${timeSlot}`,
        start: new Date(),
        end: new Date(),
      };
      setEvents([...events, newEvent]); // Add the new event to the events state
    } else {
      alert("Please fill in the required fields and enter the correct captcha!");
    }
  }
  

  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  const captchaDisplay = captcha ? <p id="captchaDisplay">{captcha}</p> : null;

  return (
    <div>
      <nav>
        <ul>
          <li><a href="#">Attendance Summary</a></li>
          <li><a href="#">Edit Attendance</a></li>
          <li><a href="#" onClick={handlelogout}>Logout</a></li>
        </ul>
      </nav>
      <div className="container">
        <div className="left">
          <h1>Generate Code</h1>
          <form>
            <label htmlFor="subject">Select Subject:</label>
            <div className="input-group">
              <select id="subject" required onChange={() => setIsFormValid(document.getElementById("subject").value && document.getElementById("time").value && document.getElementById("captcha").value)}>
                <option value="">-- Select a subject --</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>
            <label htmlFor="time">Select Time Slot:</label>
            <div className="input-group">
              <select id="time" required onChange={() => setIsFormValid(document.getElementById("subject").value && document.getElementById("time").value && document.getElementById("captcha").value)}>
                <option value="">-- Select a time slot --</option>
                <option value="8:50 - 9:40">8:50 - 9:40</option>
                <option value="9:40 - 10:30">9:40 - 10:30</option>
                <option value="10:40 - 11:30">10:40 - 11:30</option>
                <option value="11:30 - 12:20">11:30 - 12:20</option>
                <option value="13:40 - 14:30">13:40 - 14:30</option>
                <option value="14:30 - 15:20">14:30 - 15:20</option>
                <option value="15:20 - 16:10">15:20 - 16:10</option>
                <option value="16:10 - 17:00">16:10 - 17:00</option>
          </select>
        </div>
        <label htmlFor="captcha">Enter Captcha:</label>
        <div className="input-group">
          <input type="text" id="captcha" required onChange={() => setIsFormValid(document.getElementById("subject").value && document.getElementById("time").value && document.getElementById("captcha").value)} />
          <button type="button" className="captcha-button btn" onClick={generateCaptcha}>New Captcha</button>
        </div>
        {captchaDisplay}
        <button type="button" className="generate-button btn" onClick={generateCode} disabled={!isFormValid}>Generate Code</button>
      </form>
      <div className="code-display">
        <h2>Generated Code:</h2>
        <p>{codeDisplay}</p>
      </div>
    </div>
    <div className="right">
      <h1>Attendance Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  </div>
</div>
);
}

export default Faculty;