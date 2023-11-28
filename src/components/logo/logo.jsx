import SmallLogo from '@assets/stichting-accesibility/icon-accessibility.svg';
import SLogo from '@assets/stichting-accesibility/logo-accessibility.jpeg';

export default function Logo({small}) {

    if(small) {
        return  <img className="logo" src={SmallLogo} alt="Stichting Accessility logo."/>
    }

    return (
       <img className="logo" src={SLogo} alt="Stichting Accessility logo."/>
    );
}
