
import ApplicationForm from './features/components/ApplicationForm'
import  CreditLimit  from './features/components/CreditLimit'
import CreditScoreForm from './features/components/CreditScore'
function App() {

  return (
    <>
      <div className="ticks">
       <ApplicationForm/>
       <CreditLimit/>
       <CreditScoreForm/>
      </div> 
    </>
  )
}

export default App
