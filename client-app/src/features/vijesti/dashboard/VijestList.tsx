import { Button, Grid, Header, Icon, Image, Label} from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {format} from 'date-fns';

export default observer(function VijestList() {
    const {vijestStore} = useStore();
    const {deleteVijest, loading, vijestiByCategory} = vijestStore;

    const [target, setTarget] = useState('');

        function handleVijestDelete(e: SyntheticEvent<HTMLButtonElement>, slug: string) {
        setTarget(e.currentTarget.name);
        deleteVijest(slug);
    }

    const categoryIcons: Record<string, string> = {
        Sport: "🏆" , 
        "Crna Hronika": "🚨",
        Razno: "💡",
        BIH: "💙",
        Svijet: "🌍",
        Kultura: "🎭"
    };
    
    const getCategoryIcon = (category: string) => {
        return categoryIcons[category] || "📰";
    };

    // Mapa autora sa slikama
    const authorImages: Record<string, string> = {
        Admin: "/assets/Avatar/Admin.webp",
        "Admin 2": "/assets/Avatar/Admin 2.webp",
        Moderator: "/assets/Avatar/Moderator.webp",
        Alve: "/assets/Avatar/Nine.webp",
        Nine: "/assets/Avatar/Nine.webp",
        Nepoznat: "/assets/Avatar/Nepoznat.webp"
    };

    const getAuthorImage = (author: string): string => {
        return authorImages[author] || "/assets/Avatar/user.png";
    };

    const formatDate = (date: Date) => {
        const today = new Date();
    
        // Normalizacija na početak dana (ignorisanje sati, minuta i sekundi)
        const vijestDate = new Date(date);
        vijestDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = today.getTime() - vijestDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffDays === 0) {
            return "Kreirano danas";
        } else if (diffDays === 1) {
            return "Kreirano prije 1 dan";
        } else if (diffDays <= 5) {
            return `Kreirano prije ${diffDays} dana`;
        } else {
            return format(vijestDate, 'dd MMM yyyy h:mm');
        }
    };   

    return (
        <>
            {vijestiByCategory.map(([category, vijesti]) => (
                <div key={category}>
                    <Header as="h2" className="vijest-header-category">
                        {getCategoryIcon(category)} {category}
                    </Header>
                    <Grid columns={6} doubling stackable>
                        
                            <Grid.Row className="vijest-card-container">
                                <div className="blob"></div>
                                {vijesti.map((vijest) => (
                                    <Grid.Column key={vijest.slug} width={5}>
                                        <Link to={`/vijesti/${vijest.slug}`}>
                                            <div className="vijest-list-card" style={{ minHeight: '250px' }}>
                                                <Image className="vijest-slika"
                                                    src={vijest.pictureUrl || '/assets/Vijest_Slike/News.jpg'}
                                                    style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                                                />
                                                <h3 className="vijest-list-title">{vijest.title}</h3>
                                                <span className="vijest-list-date">{formatDate(new Date(vijest.publishedDate!))}</span>
                                                <Icon name="eye" className="icon-list-views">
                                                    &nbsp;{vijest.views}
                                                </Icon>
                                                <div className="right-floated-author">
                                                    <Image className="avatar-list-author" src={getAuthorImage(vijest.author)} />
                                                    {vijest.author}
                                                </div>
                                                {/* <Label
                                                    style={{ position: 'absolute', marginLeft: 30, marginTop: -12 }}
                                                    ribbon
                                                    color='blue'
                                                >
                                                    {getCategoryIcon(vijest.category)} {vijest.category}
                                                </Label> */}

                                                {/* <div className="vijest-list-button">
                                                    <Button
                                                        as={Link}
                                                        to={`/vijesti/${vijest.slug ?? ''}`}
                                                        className="citaj"
                                                        floated="left"
                                                        content="Čitaj"
                                                        color="blue"
                                                    />
                                                    <Button
                                                        className="izbrisi"
                                                        name={vijest.slug}
                                                        loading={loading && target === vijest.slug}
                                                        floated="right"
                                                        content="Izbriši"
                                                        color="red"
                                                        onClick={(e) => handleVijestDelete(e, vijest.slug ?? '')}
                                                    />
                                                </div> */}
                                            </div>
                                        </Link>
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                    </Grid>
                </div>
            ))}
        </>
    );
})