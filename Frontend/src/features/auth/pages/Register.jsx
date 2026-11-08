import react from 'react'
import { useNavigate,Link } from 'react-router'

const Register = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => { 
    e.preventDefault();
    // Handle login logic here
  }

  return (
    <main>
    <div classNAme="form-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="auth-form">

      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Enter Username" />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Enter your email" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter your password" />
      </div>

      <button className= 'button primary-button'>Register</button>

      </form>

        <p>Already have an account? <Link to="/Login" className="link">Login</Link></p> 
    </div>
  </main>
  )
}     
    
   

export default Register