import { Button } from "@components";

function OnderzoekInformatie({ titel, omschrijving, bedrijf }) {

  return (
    <div className="research-information">
        <header className="header">
        <h1 className="heading-2">{titel}</h1>
      </header>
        <section className="section">
          <h2 className="heading-3">Over onderzoek</h2>
          <p> {omschrijving} </p>
        </section>
        <section className="section">
          <h2 className="heading-3">Over bedrijf</h2>
          <p className="information-text" >{bedrijf}</p>

        </section>
    </div>
  );
}

export default OnderzoekInformatie;