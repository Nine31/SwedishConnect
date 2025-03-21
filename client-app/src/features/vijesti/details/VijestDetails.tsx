import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import VijestDetailedContent from "./VijestDetailedContent";
import VijestDetailedComment from "./VijestDetailedComment";

export default observer(function VijestDetails() {
    const {vijestStore} = useStore();
    const {selectedVijest: vijest, loadVijest, loadingInitial } = vijestStore;
    const {slug} = useParams();

    useEffect(() => {
        if (slug) loadVijest(slug);
    }, [slug, loadVijest])

    if (loadingInitial || !vijest) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={16}>
                <VijestDetailedContent vijest={vijest} />
                < br />< br />
                <VijestDetailedComment />
            </Grid.Column>
        </Grid>
    )
})