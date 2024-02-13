import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={`${styles.loader} min-h-dvh bg-dark--2`}>
      <div className={styles.circle}>
        <div className={styles.dot} />
        <div className={styles.outline} />
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
    </div>
  )
}

export default Loading
