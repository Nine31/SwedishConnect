import { Grid } from "semantic-ui-react";
import VijestList from "./VijestList";
import VijestDetails from "../details/VijestDetails";
import VijestForm from "../form/VijestForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function VijestDashboard() {
    const {vijestStore} = useStore();
    const {selectedVijest, editMode} = vijestStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <VijestList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedVijest && !editMode &&
                <VijestDetails />}
                {editMode &&
                <VijestForm />}
            </Grid.Column>
        </Grid>
    )
})