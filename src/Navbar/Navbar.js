
import { Dropdown } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import Switcher from '../darkMode/Switcher';
import image from './download.png'

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }

    return (
        <div className='lg:w-3/5 lg:mx-auto'>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex items-center">
                        <img src={image} className="h-12 mr-3 sm:h-9" alt="Flowbite Logo" />
                        <span className="text-sky-600 self-center text-xl font-bold whitespace-nowrap dark:text-white">Daily Task</span>
                    </div>
                    <div className="flex md:order-2">
                        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <Dropdown
                                label='Menu'
                                dismissOnClick={false}
                            >
                                <Dropdown.Item>
                                    <Link to='/' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Task</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to='/myTask' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Task</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to='/completedTask' className="block  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Completed Task</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to='/login' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                        <Switcher />
                                        <div class="bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                                        </div></Link>
                                </Dropdown.Item>
                            </Dropdown>
                        </button>
                    </div>
                    <div className="mt-8 items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to='/' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-xl font-bold">Add Task</Link>
                            </li>
                            <li>
                                <Link to='/myTask' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-xl font-bold">My Task</Link>
                            </li>
                            <li>
                                <Link to='/completedTask' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-xl font-bold">Completed Task</Link>

                            </li>
                            <li>
                                {
                                    user ?
                                        <Link onClick={handleLogOut} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-xl font-bold">Sign Out</Link>
                                        :
                                        <Link to='/login' className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-xl font-bold">Login</Link>
                                }
                            </li>
                            <li>
                                <Switcher />
                                <div class="bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </div>
    );
};

export default Navbar;