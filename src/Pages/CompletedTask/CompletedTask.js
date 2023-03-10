import { useQuery } from '@tanstack/react-query';
import { Button, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import SingleComplete from './SingleComplete';

const CompletedTask = () => {

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
        queryKey: ['/completeTask', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://google-task-server.vercel.app/completeTask?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='dark:bg-gray-900 dark:text-white'>
            <div className='lg:w-2/5 lg:mx-auto border-2 mt-8 lg:mt-16'>
                {
                    items?.map((item) => <SingleComplete item={item} refetch={refetch}></SingleComplete>)
                }
            </div>
        </div>
    );
};

export default CompletedTask;