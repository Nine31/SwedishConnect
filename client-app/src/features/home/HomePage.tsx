import {Button, Container, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container textAlign="center" style={{ marginTop: '7em' }} >
                <h1 style={{marginTop: '335px'}}>Dobrodošli na stranicu Život u Švedskoj</h1>

                {userStore.isLoggedIn ? (
                  <>
                        <Header as='h2' inverted content='Dobrodošli na stranicu Život u Švedskoj' />
                        <Button as={Link} to='/vijesti' size="huge" inverted>
                                Idi na početnu
                        </Button>
                  </>
                   
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                            Prijavi se
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Registruj se
                        </Button>
                    </>
                )}

            </Container>
        </Segment>
    )
})