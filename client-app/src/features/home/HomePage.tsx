import {Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <Container textAlign="center" style={{ marginTop: '7em' }}>
                <h1>Dobrodošli na Connect Sweden</h1>
                <h3> Idi na <Link to='/vijesti'>Pocetnu</Link>
                </h3>
            </Container>
        </>
    )
}