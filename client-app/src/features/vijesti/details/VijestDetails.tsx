import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function VijestDetails() {
    const {vijestStore} = useStore();
    const {selectedVijest: vijest, loadVijest, loadingInitial} = vijestStore;
    const {slug} = useParams();

    useEffect(() => {
        if (slug) loadVijest(slug);
    }, [slug, loadVijest])

    if (loadingInitial || !vijest) return <LoadingComponent />

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
                    <Button as={Link} to={`/azuriraj-vijest/${vijest.slug}`} basic color="blue" content='Izmjeni' />
                    <Button as={Link} to={'/vijesti'} basic color="red" content='Otkaži' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})