import { useLocation } from 'react-router-dom';
import { Header } from '../../components';
import './aboutDeparture.css';

export const AboutDeparture = ({ vehiclesData }) => {
  const { state } = useLocation();
  const name = state?.name || '', phone = state?.phone || '', email = state?.email || '', admin = state?.admin || false;
  const route = state?.route || {}, from = state?.from || {}, to = state?.to || {};

  const myVehicle = vehiclesData.filter((vehicle) => vehicle?.plate === route?.car_number)

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

        <div className="driver__departure">
          <span>{from} - {to}</span>
          <table border="1">
            <thead>
              <tr>
                <th>Номер маршруту</th>
                <th>Номер ТЗ</th>
                <th>Дистанція</th>
                <th>Вартість 1км</th>
                <th>Обсяг палива</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{route?.route_number ?? 'no info'}</td>
                <td>{myVehicle[0]?.plate ?? 'no info'}</td>
                <td>{route?.distance_km ?? 'no info'} км</td>
                <td>{route?.cost_per_km ?? 'no info'} грн</td>
                <td>{myVehicle[0]?.fuel_consumption ?? 'no info'} л</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
