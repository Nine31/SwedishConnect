import { useEffect, useState } from "react";
import RadnaPravaLoading from "../../../app/layout/radna_prava/RadnaPravaLoading";
import FAQSection from "./FAQSection";

export default function RadnaPravaList() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const timer = setTimeout(() => {
            setLoading(false);
            }, 1500);
    
            return () => clearTimeout(timer);
        }, []);
    
    if (loading) return <RadnaPravaLoading />
        
    return (
        <div id="faq" className="faq-body">
          <div className="faq-header">
            <h3 className="sve-o-radnim_pravima">Radna prava u Švedskoj</h3>
            <h4 className="radna-prava-podnaslov">Šta su radna prava u Švedskoj?</h4>
            <p className="faq-uvod">
                U Švedskoj radnici uživaju visoku zaštitu kroz zakone i kolektivne 
                ugovore koji regulišu radne uslove. Ovo uključuje sigurno radno okruženje, 
                pravo na odmor, plaćeni godišnji odmor, bolovanje i zaštitu od nezakonitih otkaza. 
                Sistem je dizajniran tako da štiti radnike i osigurava balans između poslovnog i privatnog života.
            </p>
            <h4 className="radna-prava-podnaslov">Kome su namijenjena radna prava?</h4>
            <p className="faq-uvod">
                Radna prava u Švedskoj odnose se na sve zaposlene, bez obzira na državljanstvo ili vrstu ugovora. 
                Bilo da ste stalno zaposleni, radite na određeno vrijeme, kao freelancer ili privremeni radnik, 
                imate određena prava i obaveze. Posebni zakoni štite i sezonske radnike, studente koji rade i 
                osobe koje dolaze putem radnih dozvola.
            </p>
            <h4 className="radna-prava-podnaslov">Kako se primjenjuju radna prava?</h4>
            <p className="faq-uvod">
                Prava radnika u Švedskoj regulišu se kroz Zakone o radu, ali i kolektivne ugovore koji se sklapaju 
                između poslodavaca i sindikata. Ako dođe do nesporazuma, radnici se mogu obratiti sindikatu ili 
                Inspekciji rada (Arbetsmiljöverket) za zaštitu svojih prava. 
                Takođe, sudovi za radne sporove mogu posredovati u slučaju ozbiljnih nesuglasica između radnika i poslodavaca.
            </p>

            <h3 className="faq-title">FAQ's - Često postavljana pitanja</h3>
            
            <div className="seperator"></div>

            <FAQSection />
        </div>

          <h2>Linkovi ka zakonima:</h2>
          <ol>
            <li>
                <a className="radna-prava-link" href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/arbetsmiljolag-19771160_sfs-1977-1160/" target="_blank">Zakon o radnoj sigurnosti</a>
            </li>
            <li>
                <a className="radna-prava-link" href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/arbetstidslag-1982673_sfs-1982-673/" target="_blank">Radno pravo u Švedskoj</a>
            </li>
            <li>
                <a className="radna-prava-link" href="https://www.av.se/arbetsmiljoarbete-och-inspektioner/lagar-och-regler-om-arbetsmiljo/om-arbetsmiljolagen/" target="_blank">Arbetsmiljöverket</a>
            </li>
          </ol>
        </div>
    )
}