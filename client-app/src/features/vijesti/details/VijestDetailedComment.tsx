import { observer } from 'mobx-react-lite'
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'

export default observer(function VijestDetailedComment() {
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                style={{border: 'none', backgroundColor: 'rgb(6, 93, 206)'}}
            >
                <Header>Ostavi komentar na ovu vijest</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Moderator</Comment.Author>
                            <Comment.Metadata>
                                <div>Idag kl. 14:15</div>
                            </Comment.Metadata>
                            <Comment.Text>Odlicno!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Odgovori na komentar</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Comment>
                        <Comment.Avatar src='/assets/user.png'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Admin</Comment.Author>
                            <Comment.Metadata>
                                <div>prije 2 dana</div>
                            </Comment.Metadata>
                            <Comment.Text>Svaka cast!!!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Odgovori na komentar</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <Form.TextArea className='textarea-comment'/>
                        <Button
                            content='Ostavi komentar'
                            labelPosition='left'
                            icon='edit'
                            style={{border: 'none', backgroundColor: 'rgb(6, 93, 206)', color: '#FFF'}}
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>
    )
})
