import { Link } from 'react-router-dom'
import '../auth.css';

export const Login = () => {
  return (
    <div className="form login">
        <div className="form-content">
            <header>Login</header>
            <form action="submit" onSubmit={(e) => e.preventDefault()}>
                <div className="field input-field">
                    <input type="email" placeholder="Email" className="input" />
                </div>
                <div className="field input-field">
                    <input type="new-password" placeholder="Password" className="password" />
                    <i className='bx bx-hide eye-icon'></i>
                </div>
                <div className="form-link">
                    <a href="https" className="forgot-pass">Forgot password?</a>
                </div>
                <div className="field button-field">
                    <button>Login</button>
                </div>
            </form>
            <div className="form-link">
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </div>
      </div>
    </div>
  )
}
