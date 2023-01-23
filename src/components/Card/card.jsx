import cn from 'classnames';
import { isLiked } from '../../utils/product';

import './index.css';
import {ReactComponent as Save} from "./save.svg";


const Card = ({name, price, _id, likes, discount, wight, description, pictures, tags, onProductLike, currentUser}) => {
	const discountPrice = Math.round(price - price*discount/100);

	const liked = isLiked(likes, currentUser._id);

	function handleLikeClick(){
		onProductLike({_id, likes})
	}

	return (
		<div className='card'>
			<div className="card__sticky card__sticky_type_top-left">
				{discount !==0 && <span className="card__discount">{`-${discount}%`}</span>}
				{tags && tags.map(tag => <span key={tag} className={cn('tag', {[`tag tag_type_${tag}`]:true})}>{tag}</span>)}
			</div>
			<div className="card__sticky card__sticky_type_top-right">
				<button className={cn('card__favourite', {'card__favourite_is-active': liked})} onClick={handleLikeClick}>
					<Save className='card__favourite-icon'/>
				</button>
			</div>

			<a href="/product" className="card__link">
				<img src={pictures} alt={description} className="card__image" />
				<div className="card__desc">
					<span className={discount !==0 ? "card__old-price":"card__price"}>{price}&nbsp;₽ </span>
					{discount !== 0 && <span className="card__price card__price_type_discount">{discountPrice}&nbsp;₽</span>}
					<span className="card__wight">{wight}</span>
					<p className="card__name">{name}</p>
				</div>
			</a>
			<a href="#" className="card__cart btn btn_type_primary">Корзина</a>
		</div>
	);
};

export default Card;
