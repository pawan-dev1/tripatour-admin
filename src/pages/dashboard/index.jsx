import Card from './Crad';
import './style.scss';
const Dashboard = () => {

  return (

    <>
    <div className="dashboard-header">
      <h2>Dashboard</h2>
    </div>
      <div className="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

    </>
  )
}
export default Dashboard;
