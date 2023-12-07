import { useLocation } from 'react-router-dom';
import { Header } from '../../components';
import './aboutDeparture.css';

export const AboutDeparture = () => {
  const { state } = useLocation();
  const from = state?.from || '', to = state?.to || '', name = state?.name || '';
  const phone = state?.phone || '', email = state?.email || '';

  return (
    <>
      <Header />
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
                <th>Вартість 1км</th>
                <th>Обсяг палива</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>101</td>
                <td>ВС1234</td>
                <td>5 грн</td>
                <td>20 л</td>
              </tr>
              <tr>
                <td>202</td>
                <td>ВС5678</td>
                <td>7 грн</td>
                <td>25 л</td>
              </tr>
              <tr>
                <td>303</td>
                <td>ВС91011</td>
                <td>6 грн</td>
                <td>18 л</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
