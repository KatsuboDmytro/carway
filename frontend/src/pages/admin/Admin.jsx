import { Driver, Header } from '../../components'
import './admin.css'

export const Admin = ({ admin }) => {
  return (
    <>
    <Header isUser={admin} />
    <section className='admin'>
      <h2>Вільні водії</h2>
      <div className="admin__cards">
        <Driver admin={admin} id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Спекторський Ігор Якович'} busy={false} />
        <Driver admin={admin} id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Ігор Якович'} busy={false} />
        <Driver admin={admin} id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Ігор'} busy={false} />
        <Driver admin={admin} id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Якович'} busy={false} />
      </div>

      <h2>Зайняті водії</h2>
      <div className="admin__cards">
        <Driver admin={admin} id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Порошенко Петро Петрович'} busy={true} />
        <Driver admin={admin} id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Порошенко'} busy={true} />
        <Driver admin={admin} id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Петро'} busy={true} />
        <Driver admin={admin} id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Петрович'} busy={true} />
      </div>
    </section>
    </>
  )
}
