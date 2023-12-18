import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header } from '../../components'
import './settings.css'

export const Settings = ({ driversData, routesData}) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  console.log("🚀 ~ file: AboutDeparture.jsx:10 ~ AboutDeparture ~ vehiclesData:", vehiclesData)

  useEffect(() => {
    axios.get('http://localhost:3001/api/vehicles')
      .then(response => {
        setVehiclesData(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  return (
    <>
      <Header isUser={true} />
      <section className='admin'>
        <div className="driver__departure">
          <span>Усі маршрути</span>
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
            {routesData.map((route) => {
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
    </>
  )
}
