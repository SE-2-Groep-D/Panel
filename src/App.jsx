
import '@pagestyles/App.scss';
import Button from '@components/button/button.jsx'
import InputField from '@components/input/inputfield.jsx';
import Checkbox from '@components/input/checkbox.jsx';
import Switch from '@components/input/switch';
import LoadingDiv from '@components/loadingdiv'; 


function App() {
  

  return (
    <>
      <h1>Test The Sass</h1>
      <h2>Test the shortcut</h2>

      <Button onClick={() => {
        console.log("click test")
      }}>primary</Button>
  
      <LoadingDiv loading>
        <InputField>Email</InputField>
        <Checkbox>I accept the privacy terms.</Checkbox>
        <Checkbox></Checkbox>
        <Switch />
        <Switch />
      </LoadingDiv>
     
     </>
  )
}

export default App
