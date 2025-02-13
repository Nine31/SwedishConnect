import { Grid, Header } from "semantic-ui-react";
import { Vijest } from "../../../app/models/vijest";
import VijestList from "./VijestList";
import VijestDetails from "../details/VijestDetails";
import VijestForm from "../form/VijestForm";

interface Props {
    vijesti: Vijest[];
    selectedVijest: Vijest | undefined;
    selectVijest: (slug: string) => void;
    cancelSelectVijest: () => void;
    editMode: boolean;
    openForm: (slug: string) => void;
    closeForm: () => void;
    createOrEdit: (vijest: Vijest) => void;
    deleteVijest: (slug: string) => void;
    submitting: boolean;
}

export default function VijestDashboard({vijesti, selectedVijest, selectVijest, cancelSelectVijest, editMode, 
    openForm, closeForm, createOrEdit, deleteVijest, submitting}: Props) {

    // Grupiranje vijesti po kategorijama
    const groupedVijesti = vijesti.reduce((acc, vijest) => {
        acc[vijest.category] = acc[vijest.category] || [];
        acc[vijest.category].push(vijest);
        return acc;
    }, {} as Record<string, Vijest[]>);

    return (
        <Grid>
            <Grid.Column width={12}>
                {Object.entries(groupedVijesti).map(([category, vijesti]) => (
                    <div key={category} style={{ marginBottom: "30px" }}>
                        <Header as="h2" dividing style={{color: "#003366"}}>
                            {category}
                        </Header>
                        <VijestList 
                            vijesti={vijesti} 
                            selectVijest={selectVijest}
                            deleteVijest={deleteVijest}
                            submitting={submitting}
                        />
                    </div>
                ))}
            </Grid.Column>
            <Grid.Column width={4}>
                {selectedVijest && !editMode &&
                <VijestDetails 
                    vijest={selectedVijest} 
                    cancelSelectVijest={cancelSelectVijest}
                    openForm={openForm}
                />}
                {editMode &&
                <VijestForm 
                    closeForm={closeForm}
                    vijest={selectedVijest}
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    );
}