import {Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <Container textAlign="center" style={{ marginTop: '7em' }}>
                <h1 style={{marginTop: '335px'}}>Dobrodošli na stranicu Život u Švedskoj</h1>
                <h3> Idi na <Link to='/vijesti'>Pocetnu</Link>
                </h3>
            </Container>
        </>
    )
}