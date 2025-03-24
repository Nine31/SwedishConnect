import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Divider, Icon, Image } from "semantic-ui-react";
import { Vijest } from "../../../app/models/vijest";
import { useEffect, useState } from "react";
import VijestDetailedComment from "./VijestDetailedComment";

interface Props {
    vijest: Vijest
}

export default observer(function VijestDetailedContent({vijest}: Props) {
    const [titleLines, setTitleLines] = useState(1);

    // Podjela sadržaja na pasuse
    const paragraphs = vijest.content.split("\n\n");

    // Mapa autora sa slikama
    const authorImages: Record<string, string> = {
        Admin: "/assets/Avatar/Admin.webp",
        "Admin 2": "/assets/Avatar/Admin 2.webp",
        Moderator: "/assets/Avatar/Moderator.webp",
        Alve: "/assets/Avatar/Nine.webp",
        Nine: "/assets/Avatar/Nine.webp",
        Nepoznat: "/assets/Avatar/Nepoznat.webp"
    };

    // Funkcija za dobijanje slike autora
    const getAuthorImage = (author: string): string => {
        return authorImages[author] || "/assets/Avatar/user.png"; // Default slika ako autor nije poznat
    };

    useEffect(() => {
        const titleElement = document.querySelector(".vijest-details-naslov");
        if (titleElement) {
            const lineHeight = parseFloat(getComputedStyle(titleElement).lineHeight);
            const titleHeight = titleElement.clientHeight;
            setTitleLines(Math.round(titleHeight / lineHeight));
        }
    }, [vijest.title]);

    function formatContent(content: string) {
        if (!content) return '';
        return content
            .replace(/\*\*(.*?)\*\*/g, '<span class="subtitle">$1</span>') 
            .replace(/“(.*?)”/g, '<span class="quote">“$1”</span>');
    }

    return (

        <div className="drybn-blog" style={{ "--title-lines": titleLines } as React.CSSProperties}>
            <div className="drybn-blog__overlay">

                <div
                    className="blog-header-image"
                    style={{ backgroundImage: `url(${vijest.pictureUrl || '/assets/Vijest_Slike/News.jpg'})` }}
                ></div>

                <div className="drybn-blog__content">
                    <div className="blog-header">
                        <p className="vijest-details-datum">{vijest.publishedDate}</p>
                        <h2 className="vijest-details-naslov">{vijest.title}</h2>
                        <p className="vijest-details-author">
                            <Image className="avatar-list-author" src={getAuthorImage(vijest.author)} />Autor:
                                {vijest.author}
                        </p>
                        <br />
                        <span className="vijest-details-pregledi"><Icon name="eye" />Broj pregleda: {vijest.views}</span>
                    </div>

                    <div className="vijest-details-body">
                        
                        <p className="sazetak-details-vijesti">{vijest.summary}</p>
                        <Divider></Divider>

                        <div className="sadrzaj-details-vijesti">
                        
                        {paragraphs.length > 0 && (
                            <p dangerouslySetInnerHTML={{ __html: formatContent(paragraphs[0]) }} />
                        )}

                        
                        {vijest.pictureUrl && (
                            <picture className="featured-image featured-image--right">
                                <img src={vijest.pictureUrl} alt="Vijest slika" style={{ height: '200px', objectFit: 'cover' }} />
                            </picture>
                        )}

                        
                        {paragraphs.length > 1 && (
                            <p dangerouslySetInnerHTML={{ __html: formatContent(paragraphs[1]) }} />
                        )}

                        
                        {paragraphs.length > 2 && (
                            <p dangerouslySetInnerHTML={{ __html: formatContent(paragraphs[2]) }} />
                        )}

                        
                        {vijest.pictureUrl && (
                            <picture className="featured-image featured-image--left">
                                <img src={vijest.pictureUrl} alt="Vijest slika" style={{ height: '200px', objectFit: 'cover' }} />
                            </picture>
                        )}

                        
                        {paragraphs.slice(3).map((paragraph, index) => (
                            <p key={index + 3} dangerouslySetInnerHTML={{ __html: formatContent(paragraph) }} />
                        ))}
                        </div>
                        <br />
                        <Divider></Divider>

                        {/* Podijeli vijest na drustvenim mrezama */}

                        <span className="podijeli-vijest">Podijelite ovu vijest na društvenim mrežama</span>

                        <br /><br />

                        <div>
                        {/* Kod za trenutno dijenje na fb preko localhost */}

                        <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank" rel="noopener noreferrer">
                        <Icon name="facebook" className="fb" />
                        </a>

                        {/* Kod za trenutno dijenje na insta preko localhost */}

                        <a 
                            href={`https://www.instagram.com/`}
                            target="_blank" rel="noopener noreferrer">
                            <Icon name="instagram" className="ig" />
                        </a>

                        {/* Kod za trenutno dijenje na linkedIn preko localhost */}
                        <a 
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(vijest?.title || 'Vijest')}`}
                        target="_blank" rel="noopener noreferrer">
                        <Icon name="linkedin" className="li" />
                        </a>

                        {/* Kod za trenutno dijenje na twitter preko localhost */}
                        <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(vijest?.title || 'Vijest')}`}
                        target="_blank" rel="noopener noreferrer">
                        <Icon name="twitter" className="tw" />
                        </a>

                        {/* Kod za dijelenje na fb kada budu aplikacija stavljena na internet */}

                        {/* <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(vijestTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon name="facebook" className="fb" />
                            </a> */}
                            
                            {/* Instagram - vodi na profil (nije moguće direktno dijeliti kao na drugim mrežama) */}
                            {/* <a
                                href="https://www.instagram.com/yourprofile"  // Link do tvog Instagram profila
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon name="instagram" className="ig" />
                            </a> */}
                            
                            {/* Kod za dijelenje na linkedIn kada budu aplikacija stavljena na internet */}
                            {/* <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon name="linkedin" className="li" />
                            </a> */}
                            
                            {/* Kod za dijelenje na twitter kada budu aplikacija stavljena na internet */}
                            {/* <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(vijestTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon name="twitter" className="tw" />
                            </a> */}
                        </div>

                        < br />

                        <Divider></Divider>

                        {/* <div className="vijesti-details-buttons">
                            <Button as={Link} to={`/azuriraj-vijest/${vijest.slug}`} color="blue" content="Izmjeni" />
                            <Button as={Link} to={'/vijesti'} color="red" content="Otkaži" />
                        </div> */}
                    </div>
                    <VijestDetailedComment />
                </div>
            </div>
        </div>
    )
})