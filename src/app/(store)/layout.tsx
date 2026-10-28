
export default function Root({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="">Dona Nina 3D</h1>

                <div className={styles.headerList}>
                    <p className={styles.headerListItem}>Decoração</p>
                    <p className={styles.headerListItem}>Colecionaveis</p>
                    <p className={styles.headerListItem}>Utilidades</p>
                    <p className={styles.headerListItem}>Arte 3D</p>
                </div>
            </div>
            {children}
        </div>
    )
}

const styles = {
    container: 'w-full h-full bg-blue-600',
    header: 'w-full h-[50px] bg-red-600 flex items-center content-between',
    headerList: 'w-auto h-auto bg-green-600 flex gap-[20px]',
    headerListItem: 'h-full bg-orange-600'
}