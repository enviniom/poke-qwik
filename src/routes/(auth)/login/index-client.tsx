import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore({
        email: '',
        password: '',
        formPosted: false
    });

    const emailError = useComputed$(() => {
        if (formState.email.includes('@')) return '';
        return 'not-valid'
    })

    const passError = useComputed$(() => {
        if (formState.password.length >= 6) return '';
        return 'not-valid'
    })

    const isFormValid = useComputed$(() => {
        if (emailError.value == 'not-valid' || passError.value == 'not-valid') return false;
        return true
    })

    const onSubmit = $(() => {
        const {email, password} = formState;

        formState.formPosted = true;

        console.log( {formValid: isFormValid.value} )

        console.log({email, password});
    });

    return (
        <form onSubmit$={onSubmit} class="login-form" preventdefault:submit >
            <div class="relative">
                <input name="email" type="text" 
                    value={formState.email} class={ formState.formPosted ? emailError.value : '' }
                    onInput$={(ev) => formState.email = (ev.target as HTMLInputElement).value}
                    placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input name="password" type="password" 
                    value={ formState.password } class={ formState.formPosted ? passError.value : '' }
                    onInput$={(ev) => formState.password = (ev.target as HTMLInputElement).value}
                    placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});
