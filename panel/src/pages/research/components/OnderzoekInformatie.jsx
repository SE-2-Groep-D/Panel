
function OnderzoekInformatie({titel, omschrijving, bedrijf}) {
    return (
        <div className="research-information">
            <header className="header">
                <h1 className="heading-2">{titel}</h1>
            </header>
            <section className="section">
                <h2 className="heading-3">Over onderzoek</h2>
                <div className="onderzoek-omschrijving">{omschrijving}</div>
            </section>
            <section className="section">
                <h2 className="heading-3">Over bedrijf</h2>
                {/* Controleer of bedrijf een waarde heeft voordat je probeert de omschrijving te renderen */}
                <p className="information-text">{bedrijf ? bedrijf.omschrijving : 'Laden...'}</p>
            </section>
        </div>
    );
}

export default OnderzoekInformatie;
