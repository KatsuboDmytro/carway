import { useLocation, useParams } from 'react-router-dom';
import { Departure, Header } from '../../components'
import './aboutDriver.css'

export const AboutDriver = ({ routesData }) => {
  const { state } = useLocation();
  const { id } = useParams();
  console.log("🚀 ~ file: AboutDriver.jsx:10 ~ AboutDriver ~ userId:", id)
  const busy = state?.busy || false, name = state?.name || '';
  const phone = state?.phone || '', email = state?.email || '', admin = state?.admin || false;

  return (
    <>
      <Header isUser={admin} routesData={routesData} />
      <section className='admin'>
        <div className="driver__info">
          <span>{name}</span>
          <aside className="driver__info-address">
            <div>{phone}</div>
            <div>{email}</div>
          </aside>
        </div>
        <h2>Успішні перевізки</h2>
        <div className="admin__cards">
          {routesData
          .filter((route) => route.driver_id === id && route.successful)
          .map((route) => {
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
        { busy ?
          <>
            <h2>Водій за кермом на маршруті</h2>
            <div className="admin__cards">
             {routesData
              .filter((route) => route.driver_id === id && !route.successful)
              .map((route) => (
                  <Departure
                    key={route.id}
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
            <form action="submit" className='inputs'>
              <input type="text" placeholder='Звідки?' required=""/>
              <input type="text" placeholder='Куди?' required=""/>
              <input type="text" placeholder='Вартість палив на 1км' required=""/>
              <input type="button" value={'Підвердити'} disabled/>
            </form>
          </>
        }
      </section>
    </>
  )
}
