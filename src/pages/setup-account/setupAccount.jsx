import '@pagestyles/setup-account.scss';


import Form from './form.jsx';
import { FormProvider } from './context/formcontext';

function SetupAccount() {
    

  return (
    <FormProvider >
        <section id="setup-account">
            <Form />
        </section>
    </FormProvider>
  );
}

export default SetupAccount;

    


    // const [stage, setStage] = useState(0);
    // const [moveOut, setMove] = useState(false);
    // const [formData, setFormData] = useState({
    //     name: null,
    //     telefoonNummer: null,
    //     gebruikersType: null,
    // });


    // function handleInputChange(event) {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    // }

    // function nextStage() {
    //     setMove(true);
    //     setTimeout(() => {
    //         setStage(stage + 1);
    //         setMove(false);
    //     }, 500);
    // }



    // return (
    //     <AccountContext.Provider id="setup-account" value={{
    //         handleInputChange,
    //         nextStage,
    //         stage,
    //         formData,
    //     }}>
    //             <Logo id="logo"></Logo>
    //             <ProgressBar stage={stage} maxStage={3}/>
    //             <Form moveOut={(moveOut) ? 'move' : ''} id='form' stage={stage}/>
    //     </AccountContext.Provider>
    // );
// }