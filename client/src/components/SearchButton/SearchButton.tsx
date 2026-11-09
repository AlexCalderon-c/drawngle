import { useSearchStore } from "../../store/useSearchStore"


function SearchButton() {

  const {
    formInput,
    searchImages,
    queryModel
  } = useSearchStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(queryModel){
      searchImages(queryModel);
    }else{
      searchImages(formInput);
    }
    
  };

  return (
    <button className='w-full h-20 bg-black' onClick={handleSearch}>
        SearchButton
    </button>
  )
}

export default SearchButton
