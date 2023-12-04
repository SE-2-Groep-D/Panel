import Form from './components/Form';

import useFormData from './hooks/useFormData';


export default function App() {
    const { currentStage } = useFormData();
   
  return (
    <div className="App">
    <h1>React Form App</h1>
    <p>Current Stage: {currentStage}</p>
    <Form />
  </div>
  )
}
