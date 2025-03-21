import { useEffect, useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { 
    Home, Newspaper, CalendarDays, Briefcase, 
    Languages, Plane, Database,
    AlignJustify,
    X
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="navbar-wrapper">
            <div className="logo-container">
                <a href="/">
                <img 
                    src="/assets/Logo/Logga.png"
                    alt="logo" 
                    className="logo"
                /></a>
            </div>

            <Menu fixed={isSticky ? 'top' : undefined} className={`custom-navbar ${isSticky ? 'sticky' : ''}`}>
                <Container>
                    <Menu.Item className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
                    </Menu.Item>

                    <div className={`menu-items ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        <Menu.Item as={NavLink} to='/' className="nav-item">
                            <Home size={20} /> <span>Početna</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/vijesti' className="nav-item">
                            <Newspaper size={20} /> <span>Vijesti iz Švedske</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/vijesti' className="nav-item">
                            <Newspaper size={20} /> <span>Vijesti sa Balkana</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/a-kassa' className="nav-item">
                            <CalendarDays size={20} /> <span>A-kassa</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/radna-prava' className="nav-item">
                            <Briefcase size={20} /> <span>Radna prava</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/svedski-jezik' className="nav-item">
                            <Languages size={20} /> <span>Švedski jezik</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/destinacije' className="nav-item">
                            <Plane size={20} /> <span>Destinacije</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/resursi' className="nav-item">
                            <Database size={20} /> <span>Resursi</span>
                        </Menu.Item>
                    </div>

                    <div className="action-buttons">
                        <Button as={NavLink} to='/kreiraj-vijest' positive>Kreiraj vijest</Button>
                        <Button primary>Kreiraj hutbu</Button>
                        <Button color='purple'>Kreiraj događaj</Button>
                    </div>
                </Container>
            </Menu>
        </div>
    );
}