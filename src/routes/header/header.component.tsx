import './header.styles.scss';

import { FC, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RootState, AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

import { clearCurrentUser } from '../../store/user/user.slice';
import { fetchCategories } from '../../store/categories/categories.action';

const Header: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const { categories, loading, error } = useSelector(( state: RootState ) => state.categories);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    
    console.log("Current User in Header:", currentUser);

    return (
        <header>
            <div className='gnb'>
                <div className='wrap_inner3'>
                    <div className='hd_left_menu'>
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
                                    <li><button onClick={() => dispatch(clearCurrentUser())}>Sign Out</button></li>
                                </Fragment>
                            ) : (
                                <li><Link to='/sign-in'>Sign In</Link></li>
                            )}
                            <li><Link to='/cart'>Cart <span>{cartItems.length}</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;