import React from 'react'
import { Header } from '../../components'

export const Settings = () => {
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

        <div className="driver__departure">
          <span>Список водіїв</span>
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

        <div className="driver__departure">
          <span>Список транспортних засобів</span>
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
