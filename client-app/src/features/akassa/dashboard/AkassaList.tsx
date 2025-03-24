import { useEffect, useState } from "react";
import AkassaLoading from "../../../app/layout/a-kassa/AkassaLoading";

const faqs = [
    {
      question: "Šta je A-kassa i kako funkcioniše?",
      answer:
        "A-kassa, skraćeno od arbetslöshetskassa, predstavlja oblik osiguranja za nezaposlene u Švedskoj koji pruža finansijsku podršku radnicima koji ostanu bez posla. Članstvo u A-kassi je dobrovoljno i otvoreno za sve koji rade ili su radili u Švedskoj, bilo da su zaposleni na puno radno vrijeme, nepuno radno vrijeme ili samozaposleni. Cilj A-kasse je osigurati finansijsku sigurnost tokom perioda nezaposlenosti, pokrivajući troškove života dok tražite novi posao.",
    },
    {
      question: "Ko može postati član A-kasse?",
      answer:
        "Svako ko radi ili je radio u Švedskoj može se pridružiti A-kassi. Postoje različite A-kasse specifične za određene profesije i opšte A-kasse otvorene za sve radnike.",
    },
    {
      question: "Koliko dugo moram biti član da bih ostvario pravo na naknadu?",
      answer:
        "Da biste ostvarili pravo na naknadu, morate biti član A-kasse najmanje 12 mjeseci i da ste radili najmanje 6 mjeseci prije nezaposlenosti, s minimalno 60 sati rada mjesečno. Ako niste član ili ste član kraće od 12 mjeseci, možete imati pravo na osnovnu naknadu, koja je niža i zasnovana na radnim satima.",
    },
    {
      question: "Kolika je visina naknade?",
      answer:
        "Maksimalna naknada iznosi 80% vaše prethodne plate, ali ne više od 1.200 SEK dnevno prije oporezivanja.",
    },
    {
      question: "Kako se prijaviti za naknadu?",
      answer:
        "Prvo se morate registrovati na Arbetsförmedlingen prvog dana nezaposlenosti, zatim podnijeti zahtjev svojoj A-kassi sa potrebnim dokumentima.",
    },
    {
      question: "Koje dokumente trebam priložiti prilikom prijave za naknadu?",
      answer:
        "Obično je potrebno priložiti dokaz o prethodnom zaposlenju, kopiju radnog ugovora i identifikacijski dokument (npr. pasoš ili ličnu kartu).",
    },
    {
      question: "Kako se obračunava visina naknade?",
      answer:
        "Visina naknade se obračunava na osnovu vaše prethodne plate, ali je ograničena maksimalnim iznosom, obično do 80% plate, uz postavljene plafone.",
    },
    {
      question: "Da li A-kassa pokriva i samozaposlene?",
      answer:
        "Većina A-kassa je namijenjena zaposlenima, dok za samozaposlene postoje posebni fondovi ili specifični uslovi. Informišite se direktno kod relevantne A-kasse.",
    },
    {
      question: "Kako se A-kassa finansira?",
      answer:
        "A-kassa se finansira iz doprinosa članova, uz podršku državnih sredstava, i predstavlja kolektivno osiguranje za nezaposlene.",
    },
    {
      question: "Koje su obaveze člana A-kasse dok prima naknadu?",
      answer:
        "Članovi moraju aktivno tražiti posao, redovno se javljati na Arbetsförmedlingen i ispunjavati uslove koje postavi A-kassa.",
    },
    {
      question: "Kako se vrši isplata naknade?",
      answer:
        "Naknada se isplaćuje direktno na bankovni račun, obično jednom mjesečno, a detalji se navode prilikom prijave.",
    },
    {
      question: "Šta se dešava ako prekinem članstvo u A-kassi?",
      answer:
        "Prekid članstva može smanjiti visinu naknade; u određenom periodu možete imati pravo samo na osnovnu naknadu.",
    },
    {
      question: "Mogu li biti istovremeno član A-kasse i raditi?",
      answer:
        "Da, možete biti član A-kasse i raditi, ali prava na naknadu zavise od ispunjavanja uslova i radnog staža.",
    },
    {
      question: "Kako se rešavaju sporovi u vezi sa naknadom?",
      answer:
        "U slučaju spora, možete se obratiti internoj žalbenoj komisiji A-kasse, a ako to ne uspije, postoji mogućnost pravnog postupka.",
    },
    {
      question: "Da li se naknada oporezuje i koliko?",
      answer:
        "Da, naknada se oporezuje po važećim poreskim stopama u Švedskoj, slično kao i redovna plata, uz zavisnost od vaše porezne situacije.",
    },
  ];

export default function AkassaList() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredFaqs = faqs.filter(
        (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) return <AkassaLoading />

    return (

        <div id="faq" className="faq-body">
          <div className="faq-header">
            <h3 className="sve-o-akassi">Sve što trebate znati o A-kassi</h3>
            <p className="faq-uvod">Dobrodošli u naš FAQ odjeljak posvećen A-kassi – ključnom instrumentu za 
               finansijsku sigurnost u periodima nezaposlenosti u Švedskoj. 
               Ovdje ćete pronaći odgovore na najčešća pitanja o funkcionisanju A-kasse, 
               uvjetima članstva, visini naknade, potrebnim dokumentima i mnogim drugim temama. 
               Naša misija je da vam pomognemo da bolje razumijete kako A-kassa radi i kako 
               možete ostvariti svoja prava, bilo da ste tek započeli svoje profesionalno 
               putovanje ili već imate dugogodišnje iskustvo rada u Švedskoj.
            </p>
            <p className="faq-uvod">Svako ko radi ili je radio u Švedskoj može se pridružiti A-kassi. 
               Međutim, da biste ostvarili pravo na naknadu zasnovanu na vašoj prethodnoj plati, 
               potrebno je da budete član A-kasse najmanje 12 mjeseci i da ste radili najmanje 
               6 mjeseci prije nezaposlenosti, s minimalno 60 sati rada mjesečno. 
               Ako niste član ili ste član kraće od 12 mjeseci, možete imati pravo na osnovnu naknadu, 
               koja je niža i zasnovana na radnim satima.</p>

            <h3 className="faq-title">FAQ's - Često postavljana pitanja</h3>
            
            <div className="seperator"></div>
            <input
              type="text"
              className="live-search-box"
              placeholder="Pretrazi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="faq-list">
            {filteredFaqs.map((faq, index) => (
              <div key={index}>
                <details>
                  <summary title={faq.question}>{faq.question}</summary>
                  <p className="faq-content">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>

          <h2>Linkovi ka relevantnim institucijama:</h2>
          <ol>
            <li>
                <a className="a-kassa-link" href="https://www.akademikernasakassa.se/en/" target="_blank">Akademikernas a-kassa</a>
            </li>
            <li>
                <a className="a-kassa-link" href="https://www.akavia.se/in-english/membership-benefits/unemployment-fund-a-kassa/" target="_blank">Akavia - Sindikat i informacije o A-kassi</a>
            </li>
            <li>
                <a className="a-kassa-link" href="https://arbetsformedlingen.se/for-arbetssokande/arbetslos---vad-hander-nu" target="_blank">Arbetsförmedlingen (Zavod za zapošljavanje)</a>
            </li>
            <li>
                <a className="a-kassa-link" href="https://www.sverigesakassor.se/" target="_blank">Sveriges a-kassor (Udruženje švedskih A-kassa)</a>
            </li>
          </ol>
        </div>
    );
}