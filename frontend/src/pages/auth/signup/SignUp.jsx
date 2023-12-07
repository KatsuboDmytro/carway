import { Link } from 'react-router-dom';
import '../auth.css';

export const SignUp = () => {
  return (
    <div className="form signup">
      <div className="form-content">
        <header>Signup</header>
        <form action="#">
          <div className="field input-field">
            <input type="email" placeholder="Email" className="input" />
          </div>

          <div className="field input-field">
            <input type="new-password" placeholder="Create password" className="password" />
          </div>

          <div className="field input-field">
            <input type="new-password" placeholder="Confirm password" className="password" />
            <i className='bx bx-hide eye-icon'></i>
          </div>

          <div className="field button-field">
            <button>Signup</button>
          </div>
        </form>

        <div className="form-link">
            <span>Already have an account? <Link to="/">Login</Link></span>
        </div>
      </div>
    </div>
  )
}
