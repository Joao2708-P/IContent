'use client';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Modules/Cadastro.module.scss';
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import { postUser } from '@/app/api/api';
import { User } from '@/app/api/api';
import { getNivel, Level } from '@/app/api/api';

export default function Cadastro() 
{
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [base64Image, setBase64Image] = useState<string>('');

  function click() {
    console.log("entrou na função");

    if (input.current) {
      input.current.click();
    }
  }

  const [user, setUser] = useState<User>({
    name: '',
    user_name: '',
    email:'',
    password: '',
    image_user: '',
    schoolLevelId: ''
  });

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Arquivo selecionado:", file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setUser((prevUser) => ({ ...prevUser, image_user: base64String })); // Atualizar o estado de user.image
      };
  
      reader.readAsDataURL(file);
    }
  }

  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) 
  {
    event.preventDefault();

    if (user.password !== confirmPassword) 
    {
      alert("As senhas não coincidem, por favor verifique novamente!");
       return;
    } 
    else 
    {
      try 
      {
        if (user.image_user) 
        {
            const { image_user, ...userData } = user;
            const userWithImage = {
              ...userData,
              image_user: base64Image,
            }; 
            postUser(userWithImage).then((response) => {
                alert('Usuário cadastrado com sucesso!');
                router.push('/signin');
                console.log(response);
            })
            .catch((error) => {
                alert(`Erro ao tentar cadastrar o usuário! ${error}`);
            });
          } 
            else 
            {
              const {...userData } = user;
              postUser({ ...userData }).then((response) => {
                    router.push('/signin');
                    alert('Usuário cadastrado com sucesso!');
                  })
                    .catch((error) => {
                        alert(`Erro ao tentar cadastrar o usuário! ${error}`);
              });
            }
          } 
          catch (error) 
          {
            alert("Erro ao cadastrar Usuário")
          }
     }
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: String(value) }));
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) 
  {
    const { name, value } = event.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } 
    else 
    {
      setUser(prevUser => ({ ...prevUser, [name]: value }));
    }
  }

  const [nivelOptions, setNivelOptions] = useState<Level[]>([])

  useEffect(() => {
    const fetchNivel = async () => {
      try {
        const niveis = await getNivel();
        console.log(niveis)
        setNivelOptions(niveis);
      } 
      catch (error) 
      {
        console.error('Erro ao buscar os níveis:', error);
      }
    };

    fetchNivel();
  }, []);

  console.log(nivelOptions);

  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.user}>
            <div className={styles.formBx}>
              <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" accept="image/png, image/jpeg, image/jpg, image/svg" id={styles.file} ref={input} onChange={handleFileChange} style={{ display: 'none' }} />
                    <Image src='/IconUserWhite.png' onClick={click} alt='userIcon' width={96} height={96} id={styles.photo} />
                    <label>Selecione uma imagem de usuário</label>
                </div>
                <div className={styles.code}>
                  <span><b>Nome</b></span>
                  <input type="text" name="name" placeholder="Inserir seu nome" value={user.name} onChange={handleChangeInput} />
                  <span><b>Nome de usuário</b></span>
                  <input type="text" name="user_name" placeholder="Inserir seu nome de usuário" value={user.user_name} onChange={handleChangeInput} />
                  <span><b>Email</b></span>
                  <input type="email" name="email" placeholder="Insira seu email" value={user.email} onChange={handleChangeInput} />
                  <span><b>Senha</b></span>
                  <input type="password" name="password" placeholder="Crie uma senha" value={user.password} onChange={handleChangeInput} />
                  <span><b>Confirmar Senha</b></span>
                  <input type="password" name="confirmPassword" placeholder="Confirme sua senha" onChange={handleChangeInput} id='confirmPassword' />
                  <span><b>Nível Escolar</b></span>
                  <div className={styles.alinhaSelect}>
                    <select className={styles.select} value={user.schoolLevelId} onChange={handleChange} name='schoolLevelId'>
                      <option value="">Selecione um Nível</option>
                      {nivelOptions.map(level =>
                        <option key={level.id} value={level.id}>
                            {level.level}
                        </option>
                      )}
                    </select>
                  </div>
                  <div className={styles.alignBtn}>
                    <input type="submit" name="submit" value="cadastrar"/>
                    <Link href='/signin'>Se já possuir uma conta  <span className={styles.span}>Logue-se</span></Link>
                  </div>

                </div>
              </form>
            </div>
            <div className={styles.imgBx}>
              <h1 className={styles.h1}>Seja Bem-Vindo, vamos rumo à sua jornada</h1>
              <div className={styles.paragrafo}>
                <p>Construa sua jornada conosco, em busca de novas formas de conhecimento</p>
                <p>Dê o próximo salto em sua formação. Faça você sua carreira e</p>
                <p>Determine seu futuro à sua maneira, deixe sua marca por</p>
                <p>onde passar! E obtenha suas conquistas! IContent</p>
              </div>
              <Image className={styles.img} src="/IContent_cropped.png" alt="fatia" width={400} height={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
