import { Button, Checkbox, Form, Segment } from "semantic-ui-react";
import { Vijest } from "../../../app/models/vijest";
import { ChangeEvent, useState } from "react";

interface Props {
    vijest: Vijest | undefined;
    closeForm: () => void;
    createOrEdit: (vijest: Vijest) => void;
}

export default function VijestForm({vijest: selectedVijest, closeForm, createOrEdit}: Props) {

    const initialState = selectedVijest ?? {
        id: '',
        title: '',
        content: '',
        summary: '',
        // slug: '',
        author: '',
        pictureUrl: '',
        category: '',
        publishedDate: new Date().toISOString(),
        views: 0,
        isFeatured: true,
        tags: []
    }

    const [vijest, setVijesti] = useState(initialState);

    function handleSubmit() {
        createOrEdit(vijest);
    }
    
    // function handleSubmit() {
    //     createOrEdit(vijest);
    // }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setVijesti({...vijest, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Naslov' value={vijest.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Sažetak' value={vijest.summary} name='summary' onChange={handleInputChange} />
                <Form.TextArea placeholder='Sadržaj vijesti...' value={vijest.content} name='content' onChange={handleInputChange} />
                {/* <Form.Input placeholder='Slug' value={vijest.slug} name='slug' onChange={handleInputChange} /> */}
                <Form.Input placeholder='Link slike' value={vijest.pictureUrl} name='pictureUrl' onChange={handleInputChange} />
                <Form.Group widths='equal'>
                    <Form.Input placeholder='Autor' value={vijest.author} name='author' onChange={handleInputChange} />
                    <Form.Input placeholder='Datum' value={vijest.publishedDate} name='date' onChange={handleInputChange} />
                </Form.Group>
                <Form.Input placeholder='Kategorija' value={vijest.category} name='category' onChange={handleInputChange} />
                <Form.Input disabled placeholder='Pregledi' value={vijest.views} name='views' onChange={handleInputChange} />
                {/* <Form.Input placeholder='Istaknuta' value={vijest.isFeatured} name='isFeatured' onChange={handleInputChange} /> */}
                <Form.Field>
                    <Checkbox 
                        label='Aktuelno' 
                        checked={vijest.isFeatured}
                    />
                </Form.Field>
                <Form.Input 
                    placeholder='Tagovi (pritisni Enter ili zarez za dodavanje)' value={vijest.tags} name='tags' onChange={handleInputChange} 
                />
                <Button floated='right' positive type='submit' content='Potvrdi' />
                <Button onClick={closeForm} floated='right' type='button' content='Otkaži' />
            </Form>
        </Segment>
    )
}