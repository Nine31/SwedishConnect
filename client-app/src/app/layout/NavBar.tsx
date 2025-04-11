import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Menu, MenuItem, Image } from "semantic-ui-react";
import { 
    Home, Newspaper, CalendarDays, Briefcase, 
    Languages, Plane, Database,
    AlignJustify,
    X
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {userStore: {user, logout}} = useStore();

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

                        {/* Dropdown za Švedski jezik sa ikonicom */}
                        <Dropdown item simple text="Svedski jezik" className="nav-item">
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/kurs-a">Kurs A</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/kurs-b">Kurs B</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/kurs-c">Kurs C</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/kurs-d">Kurs D</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* <Menu.Item as={NavLink} to='/svedski-jezik' className="nav-item">
                            <Languages size={20} /> <span>Švedski jezik</span>
                        </Menu.Item> */}
                        <Menu.Item as={NavLink} to='/destinacije' className="nav-item">
                            <Plane size={20} /> <span>Destinacije</span>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/resursi' className="nav-item">
                            <Database size={20} /> <span>Resursi</span>
                        </Menu.Item>

                        <MenuItem position='right'>
                            <Image src={user?.image || '/assets/Avatar/user2.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profil/${user?.username}`} 
                                        text='Moj profil' icon='user' />
                                <Dropdown.Item onClick={logout} text='Odjavi se' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </MenuItem>
                    </div>

                    {/* <div className="action-buttons">
                        <Button as={NavLink} to='/kreiraj-vijest' positive>Kreiraj vijest</Button>
                        <Button primary>Kreiraj hutbu</Button>
                        <Button color='purple'>Kreiraj događaj</Button>
                    </div> */}
                </Container>
            </Menu>
        </div>
    );
})