import {BallTriangle} from 'react-loader-spinner';
import s from './Loader.module.css'

export  function Loader() {
  return (
    <div className={s.loader}>
<BallTriangle
      height={50}
      width={50}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
    </div>
  );
} 