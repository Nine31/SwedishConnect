import { useEffect, useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { 
    Home, Newspaper, CalendarDays, Briefcase, 
    Languages, Plane, Database, Info, Phone 
} from "lucide-react";

export default function NavBar() {
    const {vijestStore} = useStore();

    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 180);
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
                    <Menu.Item className="navbar">
                        <Home size={20} /> Početna
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Newspaper size={20} /> Vijesti iz Švedske
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Newspaper size={20} /> Vijesti sa Balkana
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <CalendarDays size={20} /> A-kassa
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Briefcase size={20} /> Radna prava
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Languages size={20} /> Švedski jezik
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Plane size={20} /> Destinacije
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Database size={20} /> Resursi
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Info size={20} /> O nama
                    </Menu.Item>
                    <Menu.Item className="navbar">
                        <Phone size={20} /> Kontakt
                    </Menu.Item>
                </Container>
            </Menu>
            <Button className="create-hutba" content='Kreiraj hutbu' />
            <Button onClick={() => vijestStore.openForm()} positive className="create-vijest" content='Kreiraj vijest'/>
            <Button className="create-dogadjaj" content='Kreiraj događaj'/>
        </>
    )
}