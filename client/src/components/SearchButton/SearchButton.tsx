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
      console.log('DEL MODELO')
      searchImages(queryModel);
    }else{
      console.log('DEL INPUT')

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
