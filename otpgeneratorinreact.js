const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(5);  

  const timerRef = useRef(null);

  useEffect(()=>{
   timerRef.current = setInterval(() =>{       
         
        setTimer(prev => {
          if (prev < 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        
        return prev - 1;
        })
    },1000);
    return ()=>clearInterval(timerRef.current);
  },[otp])

  const getOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random()* 900000);
    console.log(randomOtp);
    if (randomOtp) {
      setOtp(randomOtp);
      setTimer(5);      
    }
  }
  const isButtonDisabled = otp && timer > 0;
  const message = timer===0 && otp ? 'OTP expired. Click the button to generate a new OTP.' : '';

  return(
    <div className='container'>
    <h1 id='otp-title'>OTP Generator</h1>
    <h2 id='otp-display'>{otp? otp : "Click 'Generate OTP' to get a code"}</h2>
     <p id='otp-timer' aria-live='polite'>{ otp && timer !== 0 ? `Expires in: ${timer} seconds`: message }</p>
     <button onClick ={getOtp} disabled={isButtonDisabled} id='generate-otp-button'>Generate OTP</button>
  </div>
 
  )
};
