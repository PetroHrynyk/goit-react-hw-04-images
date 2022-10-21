import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './Searchbar.module.css'
import { FcSearch } from 'react-icons/fc';

export function Searchbar({ onSubmit }) {
    const [searchText, setSearchText] = useState('')

    const onInputChange = (e) => {
        setSearchText(e.target.value)
    }
    return (
            <header className={styles.searchbar_header}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <button type="submit" className={styles.form_button}>
                                 <FcSearch size="2em" /> 
                    </button>

                    <input 
                        onChange={onInputChange}
                        className={styles.form_input}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        value={searchText}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}