
import s from './index.module.css';
import cn from 'classnames';

function Header({children, user, onUpdateUser}) {

  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({name: 'Никита', about: 'Слушатель'})
  }

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}

        <button className='btn' onClick={handleClickButtonEdit}>Изменить</button>

        <div className={s.header__wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
