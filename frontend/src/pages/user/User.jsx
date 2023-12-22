import { useEffect, useState } from 'react';
import { Header, Task } from '../../components'
import axios from 'axios';

export const User = ({ driver, admin }) => {
  console.log("🚀 ~ file: User.jsx:6 ~ User ~ driver:", driver)
  const [suggestedRoutes, setSuggestedRoutes] = useState([]);
  const [routesData, setRoutesData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/suggested_routes');
          setSuggestedRoutes(response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    fetchData();
  }, [flag]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/routes')
      .then(response => {
        setRoutesData(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, [flag]);

  const toDoRoutes = async (routesData) => {
    const toDo = routesData.filter((route) => +route?.driver_id === +driver?.driver_id && !route?.successful);

    if(!toDo.length) {
      try {
        const responseRoute = await axios.put('http://localhost:3005/api/driver', {driver_id: driver?.driver_id});
        console.log('Created new route:', responseRoute.data);
      } catch (error) {
        console.error('Error handling approval:', error);
      }
    }
  }
  
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
            .filter((route) => +route?.driver_id === +driver?.driver_id)
            .map((route) => {
              return (
                <Task 
                id={driver?.driver_id} 
                phone={driver?.phone} 
                email={driver?.email} 
                name={driver?.name}
                route={route}
                driver={driver}
                from={route?.start_location} 
                to={route?.end_location} 
                admin={admin} 
                proposition={false} 
                />
              )
            })}
            {()=>toDoRoutes(routesData)}
        </div>

        <h2>Запропоновані перевезення</h2>
        <div className="admin__cards">
          {driver?.isfree ?
            suggestedRoutes
            .filter((route) => +route?.driver_id === +driver?.driver_id)
            .map((route) => {
              return (
              <Task 
                key={driver?.driver_id} 
                id={driver?.driver_id} 
                suggest_id={route?.suggest_id} 
                phone={driver?.phone} 
                email={driver?.email} 
                name={driver?.name}
                driver={driver}
                route={route}
                from={route.start_location} 
                to={route.end_location} 
                admin={admin} 
                proposition={true}
                flag={flag}
                setFlag={setFlag} 
              />)
            })
            : <span>У вас ще нема запропонованих перевезень</span>
          }
          </div>
      </section>
    </>
  )
}
