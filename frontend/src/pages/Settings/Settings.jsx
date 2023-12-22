import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components'
import './settings.css'

export const Settings = ({ driversData, routesData,vehiclesData }) => {
  const { register, handleSubmit, formState: { isValid } } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const driver = state?.driver || [];
  console.log(driver);
  const { admin } = useParams();
  console.log("🚀 ~ file: Settings.jsx:9 ~ Settings ~ driver:", driver)

  const random = (numb) => {
    return Math.floor(Math.random() * numb) + 20;
  }

  const onSubmit = async (newData) => {
    const data = {
      id: driver?.driver_id || random(1000),
      isfree: driver?.isfree ?? true,
      name: newData.name,
      phone: newData.phone,
      license: newData.licenseNumber,
      email: driver?.email,
      password: driver?.password,
    };
    console.log("🚀 ~ file: Settings.jsx:25 ~ onSubmit ~ data:", data)
    try {
      const response = await axios.put('http://localhost:3003/api/driver', data);
      console.log(response.data);
      navigate(`/home`, { state: { data: data, admin: false } });
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <Header />
      {admin == 'true' ?
      <section className='admin'>
        <div className="driver__departure">
          <span>Успішні маршрути</span>
          <table border="1">
            <thead>
              <tr>
                <th>Номер маршруту</th>
                <th>Відкравлення</th>
                <th>Прибуття</th>
                <th>Номер ТЗ</th>
                <th>Дистанція</th>
                <th>Вартість 1км</th>
                <th>Обсяг палива</th>
                <th>Статус доставки</th>
              </tr>
            </thead>
            <tbody>
            {routesData
            .filter((route) => route?.successful)
            .map((route) => {
                return <tr>
                <td>{route?.route_number}</td>
                <td>{route?.start_location}</td>
                <td>{route?.end_location}</td>
                <td>{route?.car_number}</td>
                <td>{route?.distance_km}</td>
                <td>{route?.cost_per_km}</td>
                <td>{route?.fuel_consumption}</td>
                <td className='free'>{<div style={{backgroundColor: route?.successful ? 'green' : 'red'}} className='free_admin'></div>}</td>
              </tr>
              })}
            </tbody>
          </table>
        </div>

        <div className="driver__departure">
          <span>Відхилені маршрути</span>
          <table border="1">
            <thead>
              <tr>
                <th>Номер маршруту</th>
                <th>Відкравлення</th>
                <th>Прибуття</th>
                <th>Номер ТЗ</th>
                <th>Дистанція</th>
                <th>Вартість 1км</th>
                <th>Обсяг палива</th>
                <th>Статус доставки</th>
              </tr>
            </thead>
            <tbody>
            {routesData
            .filter((route) => !route?.successful)
            .map((route) => {
                return <tr>
                <td>{route?.route_number}</td>
                <td>{route?.start_location}</td>
                <td>{route?.end_location}</td>
                <td>{route?.car_number}</td>
                <td>{route?.distance_km}</td>
                <td>{route?.cost_per_km}</td>
                <td>{route?.fuel_consumption}</td>
                <td className='free'>{<div style={{backgroundColor: route?.successful ? 'green' : 'red'}} className='free_admin'></div>}</td>
              </tr>
              })}
            </tbody>
          </table>
        </div>

        <div className="driver__departure">
          <span>Список водіїв</span>
          <table border="1">
            <thead>
              <tr>
                <th>ПІБ</th>
                <th>Номер телефону</th>
                <th>Ел. пошта</th>
                <th>Ліцензія</th>
                <th>Статус роботи</th>
              </tr>
            </thead>
            <tbody>
              {driversData.map((driver) => {
                return <tr>
                <td>{driver?.name}</td>
                <td>{driver?.phone}</td>
                <td>{driver?.email}</td>
                <td>{driver?.license}</td>
                <td className='free'>{<div style={{backgroundColor: driver?.isfree ? 'green' : 'red'}} className='free_admin'></div>}</td>
              </tr>
              })}
            </tbody>
          </table>
        </div>

        <div className="driver__departure">
          <span>Список транспортних засобів</span>
          <table border="1">
            <thead>
              <tr>
                <th>Модель</th>
                <th>Рік виробництва</th>
                <th>Номер ТЗ</th>
                <th>Пробіг ТЗ</th>
                <th>Остання ТО</th>
                <th>Статус ТЗ</th>
              </tr>
            </thead>
            <tbody>
              {vehiclesData.map((vehicle) => {
                return <tr>
                <td>{vehicle?.model}</td>
                <td>{vehicle?.prod_year}</td>
                <td>{vehicle?.plate}</td>
                <td>{vehicle?.mileage}</td>
                <td>
                  {vehicle?.last_maintenance && (
                    <>
                      {new Date(vehicle.last_maintenance)
                        .toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                    </>
                  )}
                </td>
                <td className='free'>{<div style={{backgroundColor: vehicle?.status === 'active' ? 'green' : vehicle?.status === 'inactive' ? 'red' : 'orange'}} className='free_admin'></div>}</td>
              </tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
      :
      <div className='user_details'>
        <h2>Додай деталі про себе</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
          <input {...register('name', { required: true })} type="text" placeholder='ПІБ' />
          <input {...register('phone', { required: true })} type="text" placeholder='Номер телефону' />
          <input {...register('licenseNumber', { required: true })} type="number" placeholder='Номер ліцензії' />
          <input type="submit" value={'Підтвердити'} disabled={!isValid} />
        </form>
      </div>
      }
      
    </>
  )
}
