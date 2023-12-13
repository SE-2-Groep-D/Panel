import { Button } from "@components";

function ResearchInformation() {

  return (
    <div className="research-information">
        <header className="header">
        <h1 className="heading-2">Onderzoekstitel</h1>
      </header>
        <section className="section">
          <h2 className="heading-3">Over onderzoek</h2>
          <p className="information-text">Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.
          Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum.Ullamcorper in </p>
        </section>
        <section className="section">
          <h2 className="heading-3">Over bedrijf</h2>
          <p className="information-text" >Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.
          Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum.Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tell</p>
          <Button children="Opslaan"/>
        </section>
    </div>
  );
}

export default ResearchInformation;