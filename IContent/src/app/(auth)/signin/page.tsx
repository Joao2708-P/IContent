'use client'
import { useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Modules/Login.module.scss';
import { Auht } from '@/app/api/api';
import { AuthProvider, useAuth } from '@/app/AuthContents/authContents';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [signin, setAuht] = useState<Auht>({
        email: '',
        password: ''
    });

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setAuht(prevUser => ({ ...prevUser, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) 
    {
        event.preventDefault();
        const { email, password } = signin;
        try 
        {
            axios.post('http://localhost:8080/api/auth-user', { email, password })
                .then((response) => {
                    
                    localStorage.setItem('jwtToken', response.data.token);
                    // Chama a função de login do contexto de autenticação para atualizar o estado do usuário
                    login(response.data.token);
                    console.log(localStorage);
                    alert('Usuário logado com sucesso!');
                    router.push('/userPage');
                }).catch((error) => {
                    alert('Deu erro ao logar: ' + error);
                    console.log(error);
                });
        }
        catch (error) 
        {
            alert('Erro ao logar!');
        }
    }

    return (
        <div className={styles.content}>
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.user}>
                        <div className={styles.imgBx}>
                            <h1>Seja Bem-Vindo, de Volta</h1>
                            <div className={styles.paragrafo}>
                                <p>Construa sua jornada conosco, em busca de novas formas de conhecimento</p>
                                <p>Dê o próximo salto em sua formação. Faça você sua carreira e</p>
                                <p>Determine seu futuro a sua maneira, deixe sua marca por</p>
                                <p>Onde passar! E obtenha suas conquistas! IContent</p>
                            </div>
                            <Image src="/IContent_cropped.png" alt="fatia" width={400} height={200} />
                        </div>
                        <div className={styles.formBx}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.file}>
                                    <h1>Logar</h1>
                                </div>
                                <AuthProvider>
                                    <div className={styles.code}>
                                        <span><b>Email</b></span>
                                        <input type={'email'} name="email" placeholder="Insira seu email" value={signin.email} onChange={handleChangeInput} />
                                        <span><b>Senha</b></span>
                                        <input type={'password'} name="password" placeholder="Insira sua senha" value={signin.password} onChange={handleChangeInput} />
                                        <div className={styles.alignBtn}>
                                            <input type={'submit'} value="Entrar" />
                                            <Link href='/create'>Se não possui uma conta <span>Cadastre-se</span></Link>
                                        </div>
                                    </div>
                                </AuthProvider>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}