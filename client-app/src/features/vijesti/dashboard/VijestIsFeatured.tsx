import { Header, Image, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const IstaknuteVijesti = observer(() => {
    const { vijestStore } = useStore();
    const { vijestiByDate } = vijestStore;

    // Filtriramo istaknute vijesti
    const istaknuteVijesti = vijestiByDate
        .filter(vijest => vijest.isFeatured)
        .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

    return (
        <div>
            <div>
                <Header className="istaknute-vijesti-rubrika">Istaknute vijesti</Header>
            </div>
            <div style={{ paddingTop: '10px' }}>
                {istaknuteVijesti.length === 0 ? (
                    <p className="istaknute-vijesti-rubrika">Nema istaknutih vijesti.</p>
                ) : (
                    <List divided relaxed>
                        {istaknuteVijesti.map(vijest => (
                            <List.Item key={vijest.slug} style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                                <Image
                                    src={vijest.pictureUrl || '/assets/Vijest_Slike/News.jpg'}
                                    size="tiny"
                                    style={{ marginRight: '15px', objectFit: 'cover', height: '60px', width: '80px', filter: 'brightness(60%' }}
                                />
                                <List.Content>
                                    <List.Header>
                                        <Link to={`/vijesti/${vijest.slug}`} className="istaknute-vijesti-naslov">
                                            {vijest.title}
                                        </Link>
                                    </List.Header>
                                    <List.Description className="istaknute-vijesti-datum">
                                        {vijest.publishedDate}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
});

export default IstaknuteVijesti;
