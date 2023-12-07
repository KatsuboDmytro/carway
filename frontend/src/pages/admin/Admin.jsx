import { Driver } from '../../components'
import './admin.css'

export const Admin = () => {
  return (
    <section className='admin'>
      <h2>Вільні водії</h2>
      <div className="admin__cards">
        <Driver id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Спекторський Ігор Якович'} busy={false} />
        <Driver id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Ігор Якович'} busy={false} />
        <Driver id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Ігор'} busy={false} />
        <Driver id={3} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Якович'} busy={false} />
      </div>

      <h2>Зайняті водії</h2>
      <div className="admin__cards">
        <Driver id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Порошенко Петро Петрович'} busy={true} />
        <Driver id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Порошенко'} busy={true} />
        <Driver id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Петро'} busy={true} />
        <Driver id={1} phone={'0957501229'} email={'poroch19@gmail.com'} name={'Петрович'} busy={true} />
      </div>
    </section>
  )
}
