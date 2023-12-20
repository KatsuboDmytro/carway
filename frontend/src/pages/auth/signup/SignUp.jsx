import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../auth.css';
import axios from 'axios';

export const SignUp = () => {
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    try {
      const response = await axios.put('http://localhost:3004/api/driver', data);
      console.log(response.data);
      navigate(`/home`, { state: { data } }); // Якщо вам потрібно передати додаткові дані, додайте їх сюди
    } catch (error) {
      console.error('Error sending request:', error);
    }
    console.log(data);
  };

  return (
    <div className="form signup">
      <div className="form-content">
        <header>Signup</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field input-field">
            <input type="email" placeholder="Email" className="input" {...register('email', { required: true })} />
          </div>

          <div className="field input-field">
            <input type="password" placeholder="Create password" className="password" {...register('password', { required: true })} />
          </div>

          <div className="field input-field">
            <input
              type="password"
              placeholder="Confirm password"
              className="password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            <i className='bx bx-hide eye-icon'></i>
          </div>

          <div className="field button-field">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div className="form-link">
            <span>Already have an account? <Link to="/">Login</Link></span>
        </div>
      </div>
    </div>
  )
}
