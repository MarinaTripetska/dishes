import styles from "./App.module.scss";
import DishForm from "./components/DishesForm";
import Toast from "./components/Toast/Toast";

function App() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.main__thumb}>
          <DishForm />
        </div>
      </main>

      <Toast />
    </>
  );
}

export default App;
