import { Grid, Item, Image, Icon, Button } from "semantic-ui-react";
import { Vijest } from "../../../app/models/vijest";

interface Props {
    vijesti: Vijest[];
    selectVijest: (slug: string) => void;
    deleteVijest: (slug: string) => void;
}

export default function VijestList({vijesti, selectVijest, deleteVijest}: Props) {

    return (
        <Grid columns={3} stackable>
            {vijesti.map(vijest => (
                <Grid.Column key={vijest.id}>
                    <div className="vijest-card">
                        <Image 
                            src={vijest.pictureUrl || '/assets/Logo/Logga.png'}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px' }}
                        />

                        {/* Tekstualni sadržaj */}
                        <Item>
                            <Item.Content>
                                <Item.Header as="h3" style={{ marginTop: '10px' }}>
                                    {vijest.title}
                                </Item.Header>
                                <Item.Meta>
                                    <span className="vijest-date">{new Date(vijest.publishedDate).toLocaleDateString()}</span>
                                </Item.Meta>
                                <Item.Description>
                                    <Icon name="eye" /> {vijest.views} pregleda
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectVijest(vijest.slug ?? '')} content="Čitaj" color="blue" size="small" />
                                    <Button onClick={() => deleteVijest(vijest.slug ?? '')} content="Izbriši" color="red" size="small" />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </div>
                </Grid.Column>
            ))}
        </Grid>
    );
}