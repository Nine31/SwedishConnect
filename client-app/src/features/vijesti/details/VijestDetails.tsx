import { Button, Card, Image } from "semantic-ui-react";
import { Vijest } from "../../../app/models/vijest";

interface Props {
    vijest: Vijest;
    cancelSelectVijest: () => void;
    openForm: (slug: string) => void;
}

export default function VijestDetails({vijest, cancelSelectVijest, openForm}: Props) {
    if (!vijest) {
        return <h2>Vijest nije pronađena...</h2>;
    }

    return (
        <Card fluid>
            <Image src={vijest.pictureUrl}/>
            <Card.Content>
                <Card.Header>{vijest.title}</Card.Header>
                <Card.Meta>
                    <span>{vijest.publishedDate}</span>
                </Card.Meta>
                <Card.Description>
                    {vijest.content}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    {vijest.summary}
                </a>
                <Button.Group widths={2}>
                    <Button onClick={() => openForm(vijest.slug ?? '')} basic color="blue" content='Izmjeni'/>
                    <Button onClick={cancelSelectVijest} basic color="grey" content='Otkazi'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}