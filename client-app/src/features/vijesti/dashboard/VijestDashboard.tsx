import { Grid } from "semantic-ui-react";
import VijestList from "./VijestList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function VijestDashboard() {
    const {vijestStore} = useStore();
    const {loadVijesti, vijestRegistry} = vijestStore;

    useEffect(() => {
        if (vijestRegistry.size <= 1) loadVijesti();
    }, [loadVijesti])
    
      if (vijestStore.loadingInitial) return <LoadingComponent content='Učitavanje vijesti...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <VijestList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Istaknute vijesti:</h2>
            </Grid.Column>
        </Grid>
    )
})