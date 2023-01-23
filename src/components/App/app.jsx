import { useState } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Sort from '../Sort/sort';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import SearchInfo from '../SeachInfo/index';
// import data from "../../assets/data.json"
import './index.css';
import { useEffect } from 'react';
import Button from '../Button/button';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 300);


  const handleRequest = () =>{
    // const filteredCards = cards.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(filteredCards);
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch (err => console.log(err))
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
      })
      .catch (err => console.log(err))
  },[])

  useEffect(() => {
    handleRequest();
    console.log("INPUT", debounceSearchQuery);
  },[debounceSearchQuery])

  const handleFormSubmit = (event) =>{
    event.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData){
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }
  function handleProductLike(product){
    const liked = isLiked(product.likes, currentUser._id);
    api.changeLikeProduct(product._id, liked)
      .then((newCard) => {
        const newProducts = cards.map( cardState => {
          console.log('Карточка из стейта', cardState);
          console.log('Карточка из сервера', newCard);
          return cardState._id === newCard._id ? newCard : cardState
        } )
        setCards(newProducts);
      })
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/"/>
          <Search onSubmit = {handleFormSubmit} onInput = {handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
        {/* <h1 style={headerStyle}>Стилизованный заголовок</h1> */}
        {/* <Button type="primary">Купить</Button>
        <Button type="secondary">Подробнее</Button> */}
       <SearchInfo searchCount ={cards.length} searchText = {searchQuery}/>
       <Sort/>
        <div className='content__cards'>
         <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
