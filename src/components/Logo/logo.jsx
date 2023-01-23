import './index.css';
import logoSrc from './logo.svg'

function Logo({className, href}) {
  return (
    <a href={href ? href : "#"} className={className ? className : "logo"}>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    </a>
  )
}

export default Logo;
