import { useState, useEffect } from 'react'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal'
import axios from "axios";
import styles from './App.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


export function App() {

  const [cards, setCards] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [total, setTotal] = useState(0)

useEffect(() => {
  if (search !== '') {
      const URL = 'https://pixabay.com/api/';
      const KEY = '29542230-6fb76d8021b96e9e1ee6ed22a';
      const fetchPosts  = () => {
        axios.get(`${URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
          setTotal(response.data.total)
          return response.data.hits
        })
        .then(data => {
          const dataArray = [];
          data.map(({ id, webformatURL, largeImageURL }) => dataArray.push({ id, webformatURL, largeImageURL }))
          if (dataArray.length === 0) {
                     return toast.error('Search query is invalid'); 
          }
          return dataArray
        })
        .then((newCards) => {
          return setCards(cards => [...cards, ...newCards])
        })
        .catch(error => {
          setError(error)
                  return toast.error('Sorry, we have a problem'); 
        })
        .finally(() => {
          setLoading(false)
        })
      }
      fetchPosts()
    }
  }, [search, page])

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  },[error])

  const onSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== search) {
      setCards([])
      setSearch(searchValue)
      setPage(1)
      setError('')
      setLoading(true)
    } else if (searchValue === "") {

      return toast.warn('Input is empty!'); 
    }
    
  }

  const onLoadMore = () => {
    setPage(page + 1)
    setLoading(true)
  }
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const openModal = (largeImageURL) => {
    setModalImage(largeImageURL)
    toggleModal()
  }

  return (
      <div className={styles.app}>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery cards={cards} onOpen={openModal} />
        {loading && <Loader/>}
        {cards.length > 1 && cards.length < total && <Button onLoadMore={onLoadMore} />}
        {showModal && modalImage && (<Modal onClose={toggleModal} modalImage={modalImage} />)}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> 
      </div>
    );
};