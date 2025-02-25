import { Button, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function VijestList() {
    const {vijestStore} = useStore();
    const {deleteVijest, loading, vijestiByCategory} = vijestStore;

    const [target, setTarget] = useState('');

    function handleVijestDelete(e: SyntheticEvent<HTMLButtonElement>, slug: string) {
        setTarget(e.currentTarget.name);
        deleteVijest(slug);
    }

    return (
        <>
            {vijestiByCategory.map(([category, vijesti]) => (
                <Segment key={category}>
                    <Header as="h2" color="blue">
                        {category}
                    </Header>
                    <Grid columns={2}>
                        <Grid.Row>
                            {vijesti.map((vijest) => (
                                <Grid.Column key={vijest.slug} width={7}>
                                    <div className="hutba-card">
                                        <Image
                                            src={vijest.pictureUrl || '/assets/Vijest_Slike/News.jpg'}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <h3 className="hutba-title">{vijest.title}</h3>
                                        <span className="hutba-date">{vijest.publishedDate}</span>
                                        <Icon name="eye" className="icon-views">
                                            &nbsp;{vijest.views}
                                        </Icon>
                                        <Label
                                            style={{ position: 'absolute', marginLeft: 20, marginTop: -275 }}
                                            ribbon
                                            color="green"
                                        >
                                            {vijest.category}
                                        </Label>

                                        <div className="hutba-button">
                                            <Button
                                                className="citaj"
                                                onClick={() => vijestStore.selectVijest(vijest.slug ?? '')}
                                                floated="left"
                                                content="Čitaj"
                                                color="blue"
                                            />
                                            <Button
                                                className="izbrisi"
                                                name={vijest.slug}
                                                loading={loading && target === vijest.slug}
                                                content="Izbriši"
                                                color="red"
                                                onClick={(e) => handleVijestDelete(e, vijest.slug ?? '')}
                                            />
                                        </div>
                                    </div>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </Segment>
            ))}
        </>
    );
})