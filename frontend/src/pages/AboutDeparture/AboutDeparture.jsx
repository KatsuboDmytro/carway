import { useLocation } from 'react-router-dom';
import { Header } from '../../components';
import './aboutDeparture.css';

export const AboutDeparture = () => {
  const { state } = useLocation();
  const name = state?.name || '', phone = state?.phone || '', email = state?.email || '', admin = state?.admin || false;
  const route = state?.route || {};

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
          <span>{route.start_location} - {route.end_location}</span>
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
                <td>{route?.route_number}</td>
                <td>{route?.car_number}</td>
                <td>{route?.distance_km} км</td>
                <td>{route?.cost_per_km} грн</td>
                <td>{route?.fuel_consumption} л</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
