import '@pagestyles/research.scss';

import ResearchInformation from "@pages/research/components/reseachInformation";
import Map from "@pages/research/components/map";
import Information from './components/information';

function Research() {
    

  return (
    <div className="container">
      <div className="content-left">
        <ResearchInformation />
      </div>
      <div className="content-right">
        <Information/>
        <Map/>
      </div>
    </div>
  );
  }
  
export default Research;  