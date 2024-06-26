import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signinfailure,signinstart,signinsuccess, signupfailure } from '../Features/User';
function Login() {
const {loading,error,user} = useSelector((state)=>state.User);
const dispatch = useDispatch();  
const navigate = useNavigate();
const [formdata,setformdata] = useState({});
  const onchangeHandler = (e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value})    
  }
  const submitHandler = async(e)=>{
        e.preventDefault();
      dispatch(signinstart());
      if(!formdata.email){
        dispatch(signupfailure("Please enter email"))
        return ;
      }
      if(!formdata.password){
        dispatch(signupfailure("Please enter Password"))
        return ;
      }
      try{
             const resp = await fetch(`http://localhost:8080/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  });
    const data = await resp.json();
    console.log(data)
    if(!resp.ok){
      dispatch(signinfailure(data.msg));
      return ;
    }
    console.log(data.success)
    if(!data.success){
      dispatch(signinfailure(data.msg))
      return ;
    }
    console.log(data);
    dispatch(signinsuccess(data.userdata))
  navigate('/')    
  }catch(err){
        dispatch(signinfailure("Problem while login user please try after some time"))
        return ;
      }
  }
  return (
    <div className='flex gap-12 flex-col justify-center items-center'>
           
          <h1 className='font-bold text-4xl mt-10'>Welcome Back</h1>
        <form className='flex flex-col gap-4 justify-center items-center' onSubmit={submitHandler}>
          <label className="input input-bordered flex items-center gap-2 w-96">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" className="grow" placeholder="Email" id='email' onChange={onchangeHandler}/>
</label>
<label className="input input-bordered flex items-center gap-2 w-96">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" id='password' placeholder='**********' onChange={onchangeHandler}/>
</label>
      <button type='submit' className='btn btn-outline px-10 rounded-xl mt-12'>
      {loading?<>
        <span className="loading loading-spinner loading-md"></span>
      </>:
        "Sign In"
        }
      </button>
        </form>
        <div className='flex gap-1 text-sm mt-[-35px]'>
        <span>Don't have an account ?</span>
        <Link className='underline' to={'/register'}>Join us today.</Link>
    </div>
    {
      error&&(
        <div role="alert" className="alert alert-error w-96 text-center">
  <h1 className="text-center pl-16">{error} 🙏</h1>
</div>
      )
    }
    </div>
  )
}

export default Login
