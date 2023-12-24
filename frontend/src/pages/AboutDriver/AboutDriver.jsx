import { useLocation, useParams } from 'react-router-dom';
import { Departure, Header } from '../../components'
import './aboutDriver.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const AboutDriver = ({ routesData }) => {
  const { state } = useLocation();
  const { id } = useParams();
  const busy = state?.busy || false, name = state?.name || '';
  const phone = state?.phone || '', email = state?.email || '', admin = state?.admin || false;
  const { handleSubmit, register, formState: { isValid } } = useForm();

  const successLength = routesData.filter((route) => +route.driver_id === +id && route.successful);

  const toSubmit = async (data) => {
    const suggestRoute = {
      driver_id: id,
      ...data
    };

    try {
      const response = await axios.post('http://localhost:3005/api/suggested_routes', suggestRoute);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <Header isUser={admin} />
      <section className='admin'>
        <div className="driver__info">
          <span>{name}</span>
          <aside className="driver__info-address">
            <div>{phone}</div>
            <div>{email}</div>
          </aside>
        </div>
        <h2>Успішні перевізки : {successLength.length}</h2>
        <div className="admin__cards">
          {successLength.map((route) => {
            return <Departure
            admin={admin} 
            id={id} 
            name={name} 
            phone={phone} 
            email={email} 
            route={route} 
            from={route.start_location} 
            to={route.end_location}
            />
          })}
        </div>
        { !busy ?
          <>
            <h2>Водій за кермом на маршруті</h2>
            <div className="admin__cards">
             {routesData
              .filter((route) => route.driver_id === id && !route.successful)
              .map((route) => (
                  <Departure
                    admin={admin}
                    id={id}
                    name={name}
                    phone={phone}
                    email={email}
                    route={route}
                    from={route.start_location}
                    to={route.end_location}
                  />
                ))
              }
            </div>
          </>
          :
          <>
            <h2>Запропонувати роботу?</h2>
            <form onSubmit={handleSubmit(toSubmit)} className='inputs'>
              <input {...register('start_location', { required: true })} type="text" placeholder='Звідки?' />
              <input {...register('end_location', { required: true })} type="text" placeholder='Куди?' />
              <input {...register('route_number', { required: true })} type="text" placeholder='Route number' />
              <input {...register('distance_km', { required: true })} type="number" placeholder='Дистанція' />
              <input {...register('cost_per_km', { required: true })} type="number" placeholder='Вартість палива на 1км' />
              <input {...register('car_number', { required: true })} type="text" placeholder='Номер ТЗ' />
              <input style={{cursor: 'pointer'}} type="submit" value={'Підтвердити'} disabled={!isValid} />
            </form>
          </>
        }
      </section>
    </>
  )
}
