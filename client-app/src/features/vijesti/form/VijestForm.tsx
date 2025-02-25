import { Button, Checkbox, CheckboxProps, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function VijestForm() {
    const {vijestStore} = useStore();
    const {selectedVijest, closeForm, createVijest, updateVijest, loading} = vijestStore;

    const initialState = selectedVijest ?? {
        title: "",
        content: "",
        summary: "",
        author: "",
        pictureUrl: "",
        category: "",
        publishedDate: new Date().toISOString(),
        views: 0,
        isFeatured: false,
        tags: []
    }

    const [tagInput, setTagInput] = useState('');
    
    const [vijest, setVijest] = useState(initialState);

    function handleSubmit() {
        vijest.slug ? updateVijest(vijest) : createVijest(vijest);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setVijest({...vijest, [name]: value})
    }

    function handleCheckboxChange( event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        setVijest({...vijest, isFeatured: data.checked ?? false});
    }

    function handleTagInputChange(event: ChangeEvent<HTMLInputElement>) {
        setTagInput(event.target.value);
    }

    function handleTagKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            const trimmedTag = tagInput.trim();
            if (trimmedTag && !vijest.tags.includes(trimmedTag)) {
                setVijest({ ...vijest, tags: [...vijest.tags, trimmedTag] });
                setTagInput('');
            }
        }
    }

    function handleRemoveTag(index: number) {
        const updatedTags = vijest.tags.filter((_, i) => i !== index);
        setVijest({ ...vijest, tags: updatedTags });
    }

    return (
        <Segment clearing className="okvir" >
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Naslov' value={vijest.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Napiši vijest...' value={vijest.content} name='content' onChange={handleInputChange} />
                <Form.Input placeholder='Link slike' value={vijest.pictureUrl} name='pictureUrl' onChange={handleInputChange} />
                <Form.Group widths='equal'>
                    <Form.Input placeholder='Autor' value={vijest.author} name='author' onChange={handleInputChange} />
                    <Form.Input placeholder='Kategorija' value={vijest.category} name='category' onChange={handleInputChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input type="date" placeholder='Datum' value={vijest.publishedDate} name='publishedDate' onChange={handleInputChange} />
                    <Form.Input 
                        placeholder='Tagovi (pritisni Enter ili zarez za dodavanje)' 
                        value={tagInput} 
                        onChange={handleTagInputChange} 
                        onKeyDown={handleTagKeyDown}
                    />
                </Form.Group>
                <div>
                    {vijest.tags.map((tag, index) => (
                        <span key={index} style={{ marginRight: '5px' }}>
                            {tag}
                            <Button
                                onClick={() => handleRemoveTag(index)}
                                size='mini'
                                color='red'
                                icon='delete'
                                style={{ marginLeft: '5px' }}
                            /> 
                        </span>
                    ))}
                </div>
                <Form.Input disabled placeholder='Pregledi' value={vijest.views} name='views' onChange={handleInputChange} />
                <Form.Field>
                    <Checkbox 
                        label='Aktuelno' 
                        checked={vijest.isFeatured} 
                        onChange={handleCheckboxChange} 
                    />
                </Form.Field>
                <Button loading={loading} className="potvrdi" floated='right' positive type='submit' content='Potvrdi' />
                <Button onClick={closeForm} className="otkazi" floated='right' type='button' content='Otkaži' />
            </Form>
        </Segment>
    )
})