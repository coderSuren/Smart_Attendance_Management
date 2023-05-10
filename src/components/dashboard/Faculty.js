import React, { useState } from 'react';
import './style.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Authenticate() {
  const [captcha, setCaptcha] = useState('');
  const [code, setCode] = useState('');
  const [codeDisplay, setCodeDisplay] = useState('No code generated yet');
  const [events, setEvents] = useState([]);

  function generateCaptcha() {
    const newCaptcha = generateRandomCaptcha();
    setCaptcha(newCaptcha);
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
    if (captcha === document.getElementById("captchaDisplay").textContent) {
      const newCode = generateRandomCode();
      setCode(newCode);
      setCodeDisplay(newCode);

      // Create a new event with the generated code
      const newEvent = {
        title: newCode,
        start: new Date(),
        end: new Date(),
      };
      setEvents([...events, newEvent]); // Add the new event to the events state
    } else {
      alert("Incorrect Captcha!");
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
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
      <div className="container">
        <div className="left">
          <h1>Generate Code</h1>
          <form>
            <label htmlFor="captcha">Enter Captcha:</label>
            <div className="input-group">
              <input type="text" id="captcha" required />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button" onClick={generateCaptcha}>New Captcha</button>
              </div>
            </div>
            <label htmlFor="code">Code:</label>
            <div className="input-group">
              <input type="text" id="code" value={code} readOnly />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={generateCode}>Generate</button>
              </div>
            </div>
            {captchaDisplay}
          </form>
        </div>
        <div className="right">
          <h1>Calendar</h1>
          <Calendar localizer={localizer} events={events} />
        </div>
      </div>
    </div>
  );
}
export default Authenticate;
