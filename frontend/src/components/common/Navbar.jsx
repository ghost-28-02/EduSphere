import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { HiMenu, HiOutlineX } from 'react-icons/hi';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { MdArrowDropDown } from "react-icons/md";
import { logout } from '../../services/operations/authAPI';

function Navbar() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subLinks, setSubLinks] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.allCategorys);
        } catch (error) {
            console.log("Could not fetch the category list");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const closeAllMobilePanels = () => {
        setIsMobileMenuOpen(false);
        setIsCatalogOpen(false);
    };

    const navLinkClasses = (path) => {
        const isActive = matchRoute(path);
        return `rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent-500' : 'text-gray-200 hover:text-secondary-500'}`;
    };

    const renderCatalogDropdown = (isMobile = false) => {
        if (isMobile) {
            return (
                <div>
                    <button
                        type='button'
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 ${matchRoute('/catalog/:catalogName') ? 'bg-primary-700 text-accent-500' : 'text-gray-100 hover:bg-primary-700 hover:text-secondary-500'}`}
                        onClick={() => setIsCatalogOpen((prev) => !prev)}
                        aria-expanded={isCatalogOpen}
                        aria-controls='mobile-catalog-menu'
                    >
                        <span>Catalog</span>
                        <MdArrowDropDown className={`text-lg transition-transform duration-200 ${isCatalogOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                        id='mobile-catalog-menu'
                        className={`grid overflow-hidden transition-all duration-300 ease-out ${isCatalogOpen ? 'mt-1 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                        <div className='min-h-0 space-y-1 rounded-lg bg-primary-600 p-2'>
                            {subLinks.length ? (
                                subLinks.map((link, index) => (
                                    <Link
                                        to={`/catalog/${link.name.split(' ').join('-').toLowerCase()}`}
                                        key={index}
                                        className='block rounded-lg px-3 py-2 text-sm text-gray-100 transition-colors duration-200 hover:bg-primary-500 hover:text-white'
                                        onClick={closeAllMobilePanels}
                                    >
                                        {link.name}
                                    </Link>
                                ))
                            ) : (
                                <p className='px-3 py-3 text-center text-sm text-gray-300'>
                                    No Courses Found
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="group relative">
                <button
                    type="button"
                    className={`flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-200 ${matchRoute('/catalog/:catalogName') ? 'text-accent-500' : 'text-gray-200 group-hover:text-secondary-500'}`}
                    aria-haspopup="true"
                >
                    <span>Catalog</span>
                    <MdArrowDropDown className="text-base transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="invisible absolute left-1/2 top-full z-[1000] mt-3 flex w-[300px] -translate-x-1/2 flex-col rounded-2xl border border-gray-700 bg-primary-600 p-3 text-gray-100 opacity-0 shadow-xl shadow-black/30 transition-all duration-200 group-hover:visible group-hover:opacity-100">

                    <div className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-gray-700 bg-primary-600" />

                    {subLinks.length ? (
                        subLinks.map((link, index) => (
                            <Link
                                to={`/catalog/${link.name.split(' ').join('-').toLowerCase()}`}
                                key={index}
                                className="rounded-xl px-4 py-3 text-sm text-gray-100 transition-colors duration-200 hover:bg-primary-500 hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))
                    ) : (
                        <p className="px-4 py-4 text-center text-sm text-gray-300">
                            No Courses Found
                        </p>
                    )}

                </div>
            </div>
        );
    };

    const renderDesktopNav = () => (
        <nav className="hidden md:flex">
            <ul className="flex flex-row items-center gap-2 text-gray-100 lg:gap-4">
                {NavbarLinks.map((link, index) => (
                    <li key={index}>
                        {link.title === 'Catalog' ? (
                            renderCatalogDropdown(false)
                        ) : (
                            <Link to={link?.path} className={navLinkClasses(link?.path)}>
                                {link.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );

    const renderActions = (isMobile = false) => (
        <div className={`flex items-center ${isMobile ? 'flex-col gap-3' : 'gap-3'}`}>
            {user && user?.accountType !== 'Instructor' && (
                <Link
                    to={'/dashboard/cart'}
                    className={`relative flex items-center justify-center rounded-full transition-colors duration-200 ${isMobile ? 'h-11 w-11 bg-primary-600 text-gray-100 hover:bg-primary-500' : 'h-10 w-10 text-gray-200 hover:bg-primary-700 hover:text-white'}`}
                    onClick={closeAllMobilePanels}
                    aria-label="Open cart"
                >
                    <FaShoppingCart className="text-lg" />
                    {totalItems > 0 && (
                        <div className={`absolute flex items-center justify-center rounded-full bg-coral-500 ${isMobile ? '-right-1 -top-1 h-5 min-w-5 px-1' : '-right-2 -top-2 h-[18px] min-w-[18px] px-1'}`}>
                            <span className="text-xs font-semibold leading-none text-white">{totalItems}</span>
                        </div>
                    )}
                </Link>
            )}

            {token === null && (
                <div className={`flex ${isMobile ? 'w-full flex-col gap-3' : 'items-center gap-3'}`}>
                    <Link to={'/login'} onClick={closeAllMobilePanels} className={`inline-flex items-center justify-center rounded-full border border-gray-700 px-4 py-2 text-sm font-medium text-gray-100 transition-colors duration-200 hover:border-secondary-500 hover:bg-secondary-500 hover:text-white ${isMobile ? 'w-full' : ''}`}>
                        Log in
                    </Link>
                    <Link to={'/signup'} onClick={closeAllMobilePanels} className={`inline-flex items-center justify-center rounded-full bg-secondary-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary-600 ${isMobile ? 'w-full' : ''}`}>
                        Sign up
                    </Link>
                </div>
            )}

            {token !== null && (
                <div onClick={isMobile ? closeAllMobilePanels : undefined} className={isMobile ? 'w-full' : ''}>
                    <ProfileDropDown />
                </div>
            )}
        </div>
    );

    const mobileActionLinkClasses = 'flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-100 transition-colors duration-200 hover:bg-primary-700 hover:text-secondary-500';

    const renderMobileActions = () => {
        if (token === null) {
            return (
                <div className='flex flex-col gap-3'>
                    <Link to={'/login'} onClick={closeAllMobilePanels} className='inline-flex w-full items-center justify-center rounded-full border border-gray-700 px-4 py-2 text-sm font-medium text-gray-100 transition-colors duration-200 hover:border-secondary-500 hover:bg-secondary-500 hover:text-white'>
                        Log in
                    </Link>
                    <Link to={'/signup'} onClick={closeAllMobilePanels} className='inline-flex w-full items-center justify-center rounded-full bg-secondary-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary-600'>
                        Sign up
                    </Link>
                </div>
            );
        }

        return (
            <div className='flex flex-col gap-2'>
                {user && user?.accountType !== 'Instructor' && (
                    <Link to={'/dashboard/cart'} onClick={closeAllMobilePanels} className={mobileActionLinkClasses}>
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-coral-500 px-1 text-xs font-semibold text-white'>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                )}

                <Link to={'/dashboard/my-profile'} onClick={closeAllMobilePanels} className={mobileActionLinkClasses}>
                    <span>Dashboard</span>
                </Link>

                <button
                    type='button'
                    onClick={() => { dispatch(logout(navigate)); closeAllMobilePanels(); }}
                    className={`${mobileActionLinkClasses} text-left`}
                >
                    <span>Logout</span>
                </button>
            </div>
        );
    };

    return (
        <div className={`sticky top-0 z-50 border-b border-gray-700/80 bg-primary-800/95 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-200`}>
            <div className='mx-auto flex h-16 w-11/12 max-w-maxContent items-center justify-between gap-4'>
                <Link to={'/'} onClick={closeAllMobilePanels} className="flex items-center">
                    <img
                        src={Logo}
                        alt='Logo'
                        width={160}
                        height={42}
                        className="h-10 w-auto"
                    />
                </Link>

                {renderDesktopNav()}

                <div className='hidden items-center gap-2 md:flex'>
                    {renderActions(false)}
                </div>

                <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-lg border border-gray-700 bg-primary-700 p-2 text-gray-100 transition-colors duration-200 hover:border-secondary-500 hover:bg-primary-600 hover:text-white md:hidden'
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls='mobile-navigation'
                >
                    {isMobileMenuOpen ? <HiOutlineX className='text-2xl' /> : <HiMenu className='text-2xl' />}
                </button>
            </div>

            {/* Mobile backdrop */}
            <div
                onClick={closeAllMobilePanels}
                className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                aria-hidden="true"
            />

            {/* Mobile right slide-in drawer */}
            <div
                id='mobile-navigation'
                className={`fixed right-0 top-0 z-[70] flex h-screen w-[280px] max-w-[80vw] flex-col overflow-y-auto border-l border-gray-700 bg-primary-800 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
            >
                <div className='flex items-center justify-between border-b border-gray-700 px-5 py-4'>
                    <span className='text-sm font-semibold text-gray-100'>Menu</span>
                    <button
                        type='button'
                        onClick={closeAllMobilePanels}
                        aria-label='Close menu'
                        className='inline-flex items-center justify-center rounded-lg p-1 text-gray-200 transition-colors duration-200 hover:bg-primary-700 hover:text-white'
                    >
                        <HiOutlineX className='text-2xl' />
                    </button>
                </div>

                <div className='flex flex-1 flex-col gap-5 px-5 py-5'>
                    <nav>
                        <ul className='flex flex-col gap-2'>
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === 'Catalog' ? (
                                        renderCatalogDropdown(true)
                                    ) : (
                                        <Link
                                            to={link?.path}
                                            onClick={closeAllMobilePanels}
                                            className={`flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 ${matchRoute(link?.path) ? 'bg-primary-700 text-accent-500' : 'text-gray-100 hover:bg-primary-700 hover:text-secondary-500'}`}
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className='flex flex-col gap-3 border-t border-gray-700 pt-4'>
                        {renderMobileActions()}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar;