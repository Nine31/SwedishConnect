import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values)
            .catch(error => setErrors({error: 'Nevažeći email ili lozinka'}))}
        >
           {({handleSubmit, isSubmitting, errors}) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                   <Header className="header-modal-login" content='Prijavi se na život u Švedskoj' textAlign='center' />
                   <MyTextInput placeholder="Email" name="email" />
                   <MyTextInput placeholder="Lozinka" name="password" type="password" />
                   <ErrorMessage
                       name='error' render={() => <Label style={{marginBottom: 10}} 
                          basic color="red" content={errors.error}/>}
                    />
                   <Button className="button-modal-login" loading={isSubmitting} positive content='Prijavi se' type="submit" fluid />
               </Form>
           )}
        </Formik>
    )
})