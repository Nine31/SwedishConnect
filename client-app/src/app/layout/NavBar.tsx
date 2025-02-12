import { useEffect, useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    openForm: (slug?: string) => void;
}

export default function NavBar({openForm}: Props) {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        // setIsSticky(offset > 180);
        if (offset > 180) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="logo-container">
                <a href="/"><img src="/assets/Logo/Logga.png" alt="logo" className="slika"/></a>
            </div>

            <Menu fixed={isSticky ? 'top' : undefined} className={`navbar ${isSticky ? 'sticky' : ''}`}>
                <Container>
                    {/* <Menu.Item as={NavLink} to='/' name="Početna" icon='home' /> */}
                    {/* <Menu.Item as={NavLink} to='hutbe' name="Hutbe" icon='bullhorn' /> */}
                    {/* <Menu.Item as={NavLink} to='vijesti' name="Vijesti" icon='newspaper' /> */}
                    {/* <Menu.Item as={NavLink} to='dogadjaji' name="Događaji" icon='calendar alternate' /> */}
                    <Menu.Item name="Aktivnosti" icon='tasks' />
                    <Menu.Item name="Vakuf" icon='university' />
                    <Menu.Item name="Ajeti" icon='book' />
                    <Menu.Item name="Hadisi" icon='quote left' />
                    <Menu.Item name="Dženaze" icon='leaf' />
                    <Menu.Item name="O nama" icon='info circle' />
                    <Menu.Item name="Kontakt" icon='phone' />
                    <Menu.Item name="Kalendar" icon='calendar' />
                    <Menu.Item>
                        {/* <Button className="create-hutba" as={NavLink} to='kreiraj-hutbu' content='Kreiraj hutbu' />
                        <Button className="create-vijest" as={NavLink} to='kreiraj-vijest' content='Kreiraj vijest'/> */}
                    </Menu.Item>
                </Container>
            </Menu>
            {/* <Button className="create-hutba" as={NavLink} to='kreiraj-hutbu' content='Kreiraj hutbu' /> */}
            <Button className="create-vijest" onClick={() => openForm()} positive content='Kreiraj vijest'/>
            {/* <Button className="create-dogadjaj" as={NavLink} to='kreiraj-dogadjaj' content='Kreiraj događaj'/> */}
        </>
    )
}