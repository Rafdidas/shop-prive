import './header.styles.scss';
import './lnb.styles.scss';

import { FC, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RootState, AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../../store/categories/categories.action';
import { logoutUser } from '../../store/user/user.slice';

const Header: FC = () => {
    const [lnbOpen, setLnbOpen] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const { categories, loading, error } = useSelector(( state: RootState ) => state.categories);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const toggleLnb = () => {
        setLnbOpen((prevState) => !prevState);
    };

    const closeLnb = () => {
        setLnbOpen(false); // LNB를 닫음
    };

    return (
        <Fragment>
        <header>
            <div className='gnb'>
                <div className='wrap_inner3'>
                    <div className='hd_left_menu'>
                        <div className="ham" onClick={toggleLnb}></div>
                        <h1 className='logo'><Link to='/'>PRIVE</Link></h1>
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
                                    <li onClick={handleLogout} className='signout'>Sign Out</li>
                                </Fragment>
                            ) : (
                                <li><Link to='/sign-in'>Sign In</Link></li>
                            )}
                            <li><Link to='/cart'>Cart <span>{Array.isArray(cartItems) ? cartItems.length : 0}</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <nav className={`lnb_wrap ${lnbOpen ? 'on' : ''}`}>
            <div className='lnb'>
                <div className='wrap_inner3'>
                    <div className="top_lnb">
					    <div className="ham" onClick={toggleLnb}></div>
					    <h1 className='logo'><Link to='/' onClick={closeLnb}>PRIVE</Link></h1>
                        {currentUser ? (
                            <p className='user_lnb'>반갑습니다. {currentUser.displayName || currentUser.email} 님</p>
                        ) : (
                            <p className='user_lnb'>반갑습니다.</p>
                        )}
				    </div>
                    <ul className='hd_menu_list'>
                        <li><Link to='/shop' onClick={closeLnb}>All</Link></li>
                        {Array.isArray(categories) && categories.map((category) => {
                            return (
                                <li key={category}>
                                    <Link to={`/shop/${category}`} onClick={closeLnb}>{category}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
        </Fragment>
    )
}

export default Header;