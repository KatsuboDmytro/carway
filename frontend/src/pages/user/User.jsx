import { useEffect, useState } from 'react';
import { Header, Task } from '../../components'
import axios from 'axios';

export const User = ({ driver, admin, routesData }) => {
  console.log("🚀 ~ file: User.jsx:6 ~ User ~ driver:", driver)
  const [suggestedRoutes, setSuggestedRoutes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/suggested_routes')
      .then(response => {
        setSuggestedRoutes(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);
  
  return (
    <>
      <Header admin={admin} driver={driver} />
      <section className='admin'>
        <div className="driver__info">
          <span>{driver?.name ?? 'no name'}</span>
          <aside className="driver__info-address">
            <div>{driver?.phone ?? 'no phone'}</div>
            <div>{driver?.email ?? 'no email'}</div>
            <div>{driver?.license ?? 'no license'}</div>
          </aside>
        </div>
        <h2>Мої завдання</h2>
        <div className="admin__cards">
          {routesData
            .filter((route) => route?.driver_id === driver?.driver_id)
            .map((route) => {
              return (
                <Task 
                id={driver?.driver_id} 
                phone={driver?.phone} 
                email={driver?.email} 
                name={driver?.name} 
                from={route?.start_location} 
                to={route?.end_location} 
                admin={admin} 
                proposition={false} 
                />
              )
            })}
        </div>

        <h2>Запропоновані перевезення</h2>
        <div className="admin__cards">
          {driver?.isfree ?
            suggestedRoutes.map((route) => {
              return (
              <Task 
                key={driver?.driver_id} 
                id={driver?.driver_id} 
                phone={driver?.phone} 
                email={driver?.email} 
                name={driver?.name}
                route={route}
                from={route.start_location} 
                to={route.end_location} 
                admin={admin} 
                proposition={true} 
              />)
            })
            : <span>У вас ще нема запропонованих перевезень</span>
          }
          </div>
      </section>
    </>
  )
}
