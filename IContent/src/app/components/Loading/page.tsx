import styles from '../../../styles/Components/Loading.module.scss';

function Loading()
{
    return(
        <main className={styles.main}>
            <div className={`${styles.loadingContainer}`}>
                <div className={styles.loadingSpiner}></div>
                <p className={styles.paraGrafe}>Carregando...</p>
            </div>
        </main>
    )
}

export default Loading