import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function VijestDetails() {
    const {vijestStore} = useStore();
    const {selectedVijest: vijest, openForm, cancelSelectedVijest} = vijestStore;

    if (!vijest) return <LoadingComponent />

    return (
        <Card fluid>
            <Image src={vijest.pictureUrl || '/assets/Vijest_Slike/News.jpg'} />
            <Card.Content>
                <Card.Header>{vijest.title}</Card.Header>
                <Card.Meta>
                    <span>{vijest.publishedDate}</span>
                </Card.Meta>
                <Card.Description>
                    {vijest.content}
                </Card.Description>
                <Card.Meta>
                    <span>{vijest.tags.join(', ')}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openForm(vijest.slug ?? '')} basic color="blue" content='Izmjeni' />
                    <Button onClick={cancelSelectedVijest} basic color="red" content='Otkaži' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}