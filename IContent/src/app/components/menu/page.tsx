import styles from '../../../styles/Components/Menu.module.scss';
import Link from 'next/link'
import Image from 'next/image';

function Menu()
{
    return(
        <div>
            <nav className={styles.nav}>
                    <div className={styles.logo}><Image src="/IContent_cropped.png" alt='Logo' width={330} height={111}/></div>
                    <div className={styles.buttons}>
                        <Link href='/signin'><button className={styles.btnEntrar}>Entrar</button></Link>
                        <Link href='/create'><button className={styles.btnCadastrar}>Cadastrar</button></Link>
                    </div>
            </nav>
        </div>
    )
}

export default Menu