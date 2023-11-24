'use client';
import Image from 'next/image';
import  styles  from '../../styles/Modules/UserPage.module.scss';
import { Search, Home, ChevronDown, LogOut, Settings } from 'lucide-react';
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Footer from '../components/footer/footer';
import { gerarCor } from '../Function/Colors/colors';
import { useAuth } from '../AuthContents/authContents';
import Loading from '../components/Loading/page';
import Card from '../Function/Cards/Card';
import CardsPage from '../Function/Cards/page';
import { type } from 'os';
import { Level, getUniqueLevel } from '../api/api';

function userPage()
{
    const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
    const [alterContent, setAlterContent] = useState<string>('Biologia');
    const[levels, setLevels] = useState<Level | null>(null);
    const router = useRouter();
    const {user} = useAuth();
    const { logout } = useAuth();

    useEffect(() => {
        const uniqueLevelData = async () =>{
            try
            {
                if(user && user.schoolLevelId)
                {
                    const getUnique = await getUniqueLevel(user.schoolLevelId);
                    setLevels(getUnique as Level);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        };

        uniqueLevelData()
    }, [user])


    const handleAlterContent = (titlseMaterial: string) => {
        setAlterContent(titlseMaterial);
    }
    
    useEffect(() => {
        const cor = gerarCor();
        setBackgroundColor(cor);
    },[]);

    const [openLogOut, setLogOut] = useState(false);

    const handleOpenLogOut = () => {
        setLogOut(!openLogOut);
        console.log('clicou no botão de sair');
    }

    const [isClient, setIsClient] = useState(false)
    
    useEffect(() => {
        setIsClient(true)
    }, []);

    function home()
    {
        router.push('')
    }

    function LogOut1()
    {
        logout();
        router.push('/signin');
    }

    if (!user) {
        return (
            <Loading />
        )
    }

    return(
        <>
            <nav className={styles.nav}>
                <div className={styles.logo}><Image src="/IContent_cropped.png" alt='logo' width={330} height={111} quality={100}/></div>
                <div className={styles.components}>
                    <Image className={styles.imageHome} src="/home (1).png" alt='home' width={40} height={40} onClick={home}/>
                    <div className={styles.searchBar}>
                        <div className={styles.meio}>
                            <input className={styles.input} type={'text'} placeholder='Pesquisar...'/>
                            <Search  className={styles.SearchIcon}  width={30} height={30}/>
                        </div>
                    </div>
                        <img className={styles.imageUser} src={user.image_user} alt='user' width={40} height={40}/>
                        <ChevronDown className={styles.ChevronDown} width={34} height={34} onClick={() => handleOpenLogOut()}/>
                            {openLogOut && (
                                <div className={`${styles.userLogOut}`}>
                                    <div className={styles.elements}>
                                        <h4 className={styles.h4}>{user.name}</h4>
                                        <h4 className={styles.h4}>{user.user_name}</h4>
                                        <h4 className={styles.h4}>{user.email}</h4>
                                        <h4 className={styles.h4}>{levels?.level}</h4>
                                        <div className={styles.line}></div>
                                        <div className={styles.sair}>
                                            <LogOut className={styles.logOut} onClick={LogOut1}/>
                                                <h4 className={styles.h4Sair} onClick={LogOut1}>Sair</h4>
                                            <Settings className={styles.Settings} width={20} height={20}/>
                                        </div>
                                </div>
                            </div>
                        )}
                </div>
            </nav>
            
            {isClient && (
                <section className={styles.section}>
                        <div className={styles.tittleMaterial} style={{ backgroundColor }}>
                            <div className={styles.alingText}>
                                <h2 className={styles.h2}>Materias</h2>
                            </div>
                        </div>
                        <div className={styles.materials} style={{backgroundColor}}>
                            <h3 className={styles.h5}>Materias</h3>
                        </div>
                        <CardsPage backgroundColor={backgroundColor}/>
                        <Footer/>
                </section>
            )}
        </>
    )
}

export default userPage