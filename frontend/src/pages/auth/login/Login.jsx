import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import '../auth.css';

export const Login = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        if(data.email === 'admin@admin.com') {
            navigate(`/home`, { state: { admin: true } });
        } else {
            try {
              const response = await axios.put('http://localhost:3002/api/driver', data);
              console.log(response.data);
            //   const driver = response.data;
              navigate(`/home`, { state: { data, admin: false } });
            } catch (error) {
              console.error('Error sending request:', error);
            }
        }
    };

  return (
    <div className="form login">
        <div className="form-content">
            <header>Login</header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field input-field">
                    <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    {...register('email')}
                    />
                </div>
                <div className="field input-field">
                    <input
                    type="password"
                    placeholder="Password"
                    className="password"
                    {...register('password')}
                    />
                    <i className='bx bx-hide eye-icon'></i>
                </div>
                <div className="form-link">
                    <a href="https" className="forgot-pass">
                    Forgot password?
                    </a>
                </div>
                <div className="field button-field">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="form-link">
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </div>
      </div>
    </div>
  )
}
