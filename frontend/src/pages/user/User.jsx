import { Header, Task } from '../../components'

export const User = ({ admin }) => {
  const name = 'Спекторський Ігор Якович', phone = '0957501229', email = 'poroch19@gmail.com';

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
        <h2>Мої завдання</h2>
        <div className="admin__cards">
          <Task id={3} phone={phone} email={email} name={name} from={'Житомир'} to={'Невідомість'} admin={admin} proposition={false} />
        </div>

        <h2>Запропоновані перевезення</h2>
        <div className="admin__cards">
          <Task id={1} phone={phone} email={email} name={name} from={'Тернопіль'} to={'Житомир'} admin={admin} proposition={true} />
          <Task id={1} phone={phone} email={email} name={name} from={'Канів'} to={'Фастів'} admin={admin} proposition={true} />
        </div>
      </section>
    </>
  )
}
