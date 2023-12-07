import { useLocation } from 'react-router-dom';
import { Departure, Header } from '../../components'
import './aboutDriver.css'

export const AboutDriver = () => {
  const { state } = useLocation();
  const busy = state?.busy || false, name = state?.name || '';
  const phone = state?.phone || '', email = state?.email || '', admin = state?.admin || false;

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

        { busy ?
          <>
            <h2>Водій за кермом на маршруті</h2>
            <div className="admin__cards">
              <Departure admin={admin} id={8} name={name} phone={phone} email={email} from={'Негроні'} to={'Тхемале'}/>
            </div>

            <h2>Успішні перевізки</h2>
            <div className="admin__cards">
              <Departure admin={admin} id={4} name={name} phone={phone} email={email} from={'Київ'} to={'Тбілісі'}/>
              <Departure admin={admin} id={4} name={name} phone={phone} email={email} from={'Київ'} to={'Тбілісі'}/>
            </div>
          </>
          :
          <>
            <h2>Успішні перевізки</h2>
            <div className="admin__cards">
              <Departure admin={admin} id={2} name={name} phone={phone} email={email} from={'Київ'} to={'Черкаси'}/>
              <Departure admin={admin} id={2} name={name} phone={phone} email={email} from={'Біла-Церква'} to={'Буковель'}/>
            </div>
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
