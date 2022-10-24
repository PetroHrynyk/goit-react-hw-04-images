import axios from 'axios';
import { toast } from 'react-toastify';

import { URL, KEY } from '../constants/api'

export function fetchPosts(search, page) {
  return axios.get(`${URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response =>
      ({
       total: response.data.total,
       cards: response.data.hits,
      })
    )
}
