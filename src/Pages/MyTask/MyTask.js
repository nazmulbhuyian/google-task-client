import { useQuery } from '@tanstack/react-query';
import { Button, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import SingleTask from './SingleTask';

const MyTask = () => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        <Button>
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3">
                Loading...
            </span>
        </Button>
    }

    const { refetch, error, data: items = [] } = useQuery({
        queryKey: ['/myTasks', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myTasks?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className='lg:w-2/5 lg:mx-auto border-2 mt-8 lg:mt-16'>
            {
                items?.map((item, i) => <SingleTask item={item} refetch={refetch}></SingleTask>)
            }
        </div>
    );
};

export default MyTask;