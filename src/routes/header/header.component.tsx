import './header.styles.scss';

import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useCategories } from '../../contexts/categories.context';
import { useCart } from '../../contexts/cart.context';
import { useUser } from '../../contexts/user.context';


const Header: FC = () => {
    const { categories, loading, error } = useCategories();
    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const { currentUser, signOut } = useUser();

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <header>
            <div className='gnb wrap_inner3'>
                <div className='hd_left_menu'>
                    <h1><Link to='/'>PRIVE</Link></h1>
                    <ul className='hd_menu_list'>
                        <li><Link to='/shop'>All</Link></li>
                        {Array.isArray(categories) && categories.map((category) => {
                            return (
                                <li key={category}>
                                    <Link to={`/shop/${category}`}>{category}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='hd_right_menu'>
                    <ul className='my_menu'>
                        {currentUser ? (
                            <Fragment>
                                <li>{currentUser.displayName || currentUser.email}</li>
                                <li><button onClick={signOut}>Sign Out</button></li>
                            </Fragment>
                        ) : (
                            <li><Link to='/sign-in'>Sign In</Link></li>
                        )}
                        <li><Link to='/cart'>Cart <span>{totalItems}</span></Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;