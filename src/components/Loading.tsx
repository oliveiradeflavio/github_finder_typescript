import styles from "./Loading.module.css"

const Loading = () => {
    return (
        <div className={styles.dots_container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    )
}

export default Loading