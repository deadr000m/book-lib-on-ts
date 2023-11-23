import BookForm from '../components/BookForm/BookForm';
import Filter from '../components/Filter/Filter';
import BookList from '../components/BookList/BookList';

const HomePage = () => {
  return (
    <main className="app-main">
      <div className="app-left-column">
        <BookForm />
      </div>
      <div className="app-right-column">
        <Filter />
        <BookList></BookList>
      </div>
    </main>
  );
};

export default HomePage;
