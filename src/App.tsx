import styles from "./App.module.scss";
import DishForm from "./components/DishesForm";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.main__thumb}>
        <DishForm />
      </div>
    </main>
  );
}

export default App;
