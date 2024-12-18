import './header.styles.scss';

import { FC } from 'react';
import { useCategories } from '../../contexts/categories.context';
import { Link } from 'react-router-dom';


const Header: FC = () => {
    const { categories, loading, error } = useCategories();

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
                        <li><Link to='/'>Log In</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;