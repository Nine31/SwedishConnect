import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values)
               .catch(error => setErrors({error}))}

            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
           {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
               <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                   <Header className="header-modal-register" content='Registrirajte se na život u Švedskoj' />
                   <MyTextInput placeholder="Nadimak" name="displayName" />
                   <MyTextInput placeholder="Korisničko ime" name="username" />
                   <MyTextInput placeholder="Email" name="email" />
                   <MyTextInput placeholder="Lozinka" name="password" type="password"/>
                   <ErrorMessage
                       name='error' render={() => 
                        <ValidationErrors errors={errors.error as unknown as string[]} />
                        // <Label style={{marginBottom: 10}} basic color="red" content={errors.error} />
                        }
                    />
                   <Button 
                           className="button-modal-register"
                           disabled={!isValid || !dirty || isSubmitting}
                           loading={isSubmitting} 
                           positive content='Registruj se' 
                           type="submit" fluid />
               </Form>
           )}
        </Formik>
    )
})