import { useState, useEffect } from 'react'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal'
import styles from './App.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPosts } from '../services/posts';


export function App() {

  const [cards, setCards] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [total, setTotal] = useState(0)

useEffect(() => {
  if (search !== '') {
    fetchPosts(search, page).then(data => {
       setTotal(data.total)
       setCards(prev=>[...prev, ...data.cards])
     }).catch(() => {
       return toast.error('Sorry, we have a problem');
     }).finally(() => {
         setLoading(false)
       })
    }
  }, [search, page])

  const onSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== search) {
      setCards([])
      setSearch(searchValue)
      setPage(1)
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
