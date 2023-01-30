import SearchBar from "../components/searchbar";

function Home() {
  return (
    <div className="flex h-screen">
      <div className="h-12 w-3/5 m-auto">
        <SearchBar />
      </div>
    </div>
  );
}

export default Home;