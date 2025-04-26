import { Button, Checkbox, CheckboxProps, Form, Grid} from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Vijest } from "../../../app/models/vijest";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default observer(function VijestForm() {
    const {vijestStore} = useStore();
    const {selectedVijest, createVijest, updateVijest, loading, loadVijest, loadingInitial} = vijestStore;
    const {slug} = useParams();
    const navigate = useNavigate();

    const [vijest, setVijest] = useState<Vijest>({
        title: "",
        content: "",
        summary: "",
        author: "",
        pictureUrl: "",
        category: "",
        publishedDate: null,
        // publishedDate: new Date().toISOString(),
        views: 0,
        isFeatured: false,
        tags: []
    })

    useEffect(() => {
        if (slug) loadVijest(slug).then(vijest => setVijest(vijest!))
    }, [slug, loadVijest])

    const [tagInput, setTagInput] = useState('');
    
    function handleSubmit() {
        if (!vijest.slug) {
            createVijest(vijest).then(() => navigate(`/vijesti/${vijest.slug}`))
        } else {
            updateVijest(vijest).then(() => navigate(`/vijesti/${vijest.slug}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
    
        // Zamjenjujemo Enter sa \n (novi red) ili \n\n (novi pasus)
        const formattedValue = name === "content" 
            ? value.replace(/\n{3,}/g, "\n\n").replace(/\n{2}/g, "\n\n") // Dvostruki Enter = pasus
            : value;
    
        setVijest({ ...vijest, [name]: formattedValue });
    }

    if (loadingInitial) return <LoadingComponent content="Učitavanje vijesti..." />

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

    function insertAtCursor(styleType: "subtitle" | "quote") {
        const textarea = document.querySelector("textarea[name='content']") as HTMLTextAreaElement;
        if (!textarea) return;
    
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
    
        let startTag = "";
        let endTag = "";
    
        if (styleType === "subtitle") {
            startTag = "**"; 
            endTag = "**\n\n";
        } else if (styleType === "quote") {
            startTag = '“'; 
            endTag = '”\n\n';
        }
    
        // Ubacujemo oznake na trenutno mesto kursora
        const newText =
            vijest.content.slice(0, start) +
            startTag +
            vijest.content.slice(start, end) +
            endTag +
            vijest.content.slice(end);
    
        setVijest({ ...vijest, content: newText });
    
        // Postavljamo kursor između oznaka
        setTimeout(() => {
            textarea.selectionStart = start + startTag.length;
            textarea.selectionEnd = end + startTag.length;
            textarea.focus();
        }, 0);
    }

    return (
        <Grid clearing className="vijest-form-okvir" >
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Naslov' value={vijest.title} name='title' onChange={handleInputChange} className="vijest-form-title"/>

                <Form.Input placeholder='Napiši kratak sazetak...' value={vijest.summary} name='summary' onChange={handleInputChange} className="vijest-form-summary" />

                <Form.TextArea placeholder='Napiši vijest...' value={vijest.content} name='content' onChange={handleInputChange} style={{ whiteSpace: "pre-wrap" }} className="vijest-form-content"/>

                {/* Dugmad za dodavanje podnaslova i citata */}
                <div style={{ marginBottom: "10px" }}>
                    <Button
                        type="button"
                        onClick={() => insertAtCursor("subtitle")} 
                        content="Dodaj Podnaslov"
                        color="blue"
                    />
                    <Button
                        type="button"
                        onClick={() => insertAtCursor("quote")} 
                        content="Dodaj Citat"
                        color="purple"
                    />
                </div>

                <Form.Input placeholder='Link slike' value={vijest.pictureUrl} name='pictureUrl' onChange={handleInputChange} className="vijest-form-pictureUrl"/>

                <Form.Group widths='equal'>
                    <Form.Input placeholder='Autor' value={vijest.author} name='author' onChange={handleInputChange} className="vijest-form-author"/>
                    <Form.Input placeholder='Kategorija' value={vijest.category} name='category' onChange={handleInputChange} className="vijest-form-category"/>
                </Form.Group>

                <Form.Group widths='equal'>
                    {/* <Form.Input type="date" placeholder='Datum' value={vijest.publishedDate} name='publishedDate' onChange={handleInputChange} /> */}
                    <Form.Input>
                        <DatePicker
                            selected={vijest.publishedDate ? new Date(vijest.publishedDate) : null}
                            onChange={(date) => setVijest({ ...vijest, publishedDate: date })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="dd/MMM/yyyy HH:mm"
                            className="date-picker-input"
                        />
                    </Form.Input>
                    <Form.Input 
                        placeholder='Tagovi (pritisni Enter ili zarez za dodavanje)' 
                        value={tagInput} 
                        onChange={handleTagInputChange} 
                        onKeyDown={handleTagKeyDown}
                        className="vijest-form-tags"
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
                        className="vijest-form-isFeatured" 
                    />
                </Form.Field>

                <Button loading={loading} className="potvrdi" floated='right' positive type='submit' content='Potvrdi' />
                <Button as={Link} to={`/vijesti/${vijest.slug ?? ''}`} className="otkazi" floated='right' type='button' content='Otkaži' />
            </Form>
        </Grid>
    )
})