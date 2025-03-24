import { useState } from "react";

const faqData = [
    {
      question: "Koja su osnovna radna prava u Švedskoj?",
      answer:
        "Osnovna radna prava uključuju sigurno radno okruženje, pravo na odmor, zdravstvenu zaštitu i zaštitu od nezakonitih otkaza.",
    },
    {
      question: "Koje vrste ugovora o radu postoje?",
      answer:
        "Postoje ugovori o radu na određeno vrijeme, neodređeno vrijeme, honorarni i privremeni ugovori. Svaka vrsta ima specifične uvjete i prava.",
    },
    {
      question: "Postoji li zakonski propisana minimalna plata?",
      answer:
        "U Švedskoj minimalna plata nije zakonski određena, već se uslovi određuju kroz kolektivne ugovore.",
    },
    {
      question: "Koja su prava radnika u slučaju otkaza?",
      answer:
        "Radnici imaju pravo na obavještenje, otpremninu i, u određenim slučajevima, pravnu zaštitu ako je otkaz nezakonit.",
    },
    {
      question: "Kako se regulira prekovremeni rad?",
      answer:
        "Prekovremeni rad se regulira kolektivnim ugovorima, a radnici imaju pravo na dodatnu naknadu za prekovremeni rad.",
    },
    {
      question: "Koje institucije su odgovorne za radna prava?",
      answer:
        "Relevantne institucije uključuju Arbetsförmedlingen, Inspektionen för arbetsmiljö och arbetsliv (IA), te sindikate i pravne savjetnike.",
    },
    {
      question: "Kako mogu saznati više o radnom pravu?",
      answer:
        "Više informacija možete pronaći na zvaničnim stranicama kao što su [arbetsratt.se](https://www.arbetsratt.se/) ili [arbetsmiljolagen.se](https://www.arbetsmiljolagen.se/).",
    },
    {
      question: "Da li radnici imaju pravo na sindikalno zastupanje?",
      answer:
        "Da, u Švedskoj radnici imaju pravo da se udruže u sindikate i da kolektivno pregovaraju o svojim pravima.",
    },
    {
      question: "Šta raditi ako se osjećam diskriminisanim na poslu?",
      answer:
        "Ako se osjećate diskriminisanim, obratite se svom sindikatu, pravnoj službi ili Inspekciji za radnu okolinu (IA).",
    },
    {
      question: "Koja su vaša prava ako radite kao honorarni radnik?",
      answer:
        "Honorarnim radnicima također se moraju poštovati osnovna radna prava, ali uvjeti mogu varirati ovisno o ugovoru i industriji.",
    },
    {
      question: "Mogu li radnici tražiti povećanje plate kroz kolektivne pregovore?",
      answer:
        "Da, kolektivni pregovori su ključni mehanizam za pregovaranje o uslovima rada, uključujući povećanje plata.",
    },
    {
      question: "Šta ako ugovor ne sadrži sve bitne informacije o pravima radnika?",
      answer:
        "U tom slučaju, preporučuje se konzultirati se sa sindikatom ili pravnim stručnjakom kako biste osigurali da su vaša prava zaštićena.",
    },
    {
      question: "Kako se reguliše radno vrijeme i odmor?",
      answer:
        "Radno vrijeme, pauze i godišnji odmor su regulisani kolektivnim ugovorima i Zakonom o radnom vremenu u Švedskoj.",
    },
    {
      question: "Šta su to 'kolektivni ugovori' i zašto su važni?",
      answer:
        "Kolektivni ugovori su sporazumi između sindikata i poslodavaca koji određuju uslove rada, plate, radno vrijeme i druge aspekte radnog odnosa.",
    },
  ];

export default function FAQSection() {
    const [searchTerm, setSearchTerm] = useState("");
      
    const filteredFaqs = faqData.filter(
        (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="faq-list">
            <input
                type="text"
                className="live-search-box"
                placeholder="Pretrazi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredFaqs.map((faq, index) => (
              <div key={index}>
                <details>
                  <summary title={faq.question}>{faq.question}</summary>
                  <p className="faq-content">{faq.answer}</p>
                </details>
              </div>
            ))}
        </div>
    )
}