import { Driver, Header } from '../../components'
import './admin.css'

export const Admin = ({ driversData, admin }) => {
  return (
    <>
    <Header admin={admin} driversData={driversData} />
    <section className='admin'>
      <h2>Вільні водії</h2>
      <div className="admin__cards">
        {driversData.filter((driver) => driver.isfree !== false && driver.name).map(({ driver_id, phone, email, name }) => (
          <div key={driver_id}>
            <Driver admin={admin} id={driver_id} phone={phone} email={email} name={name} busy={true} />
          </div>
        ))}
      </div>

      <h2>Зайняті водії</h2>
      <div className="admin__cards">
        {driversData.filter((driver) => driver.isfree === false && driver.name).map(({ driver_id, phone, email, name }) => (
          <div key={driver_id}>
            <Driver admin={admin} id={driver_id} phone={phone} email={email} name={name} busy={false} />
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
