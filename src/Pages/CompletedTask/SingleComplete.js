import { Avatar, Button } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SingleComplete = ({ item, refetch }) => {

    const navigate = useNavigate()

    const handleDelete = (id) => {
        fetch(`https://google-task-server.vercel.app/deleteTasks/${id}`, {
            method: 'DELETE',
            headers: {

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Task Delete Successfully')
                    refetch()
                }
            })
    }

    const handleInComplete = (item) => {
        const info = {
            img: item.img,
            email: item.email,
            about: item.about
        }
        fetch('https://google-task-server.vercel.app/addTasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged === true) {
                    fetch(`https://google-task-server.vercel.app/deleteTasks/${item._id}`, {
                        method: 'DELETE',
                        headers: {

                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                toast.error('Task is InComplete')
                                navigate('/myTask')
                            }
                        })

                }
            })


    }

    return (
        <div className='lg:m-8 border-2 m-2'>
            <div className='grid grid-cols-3 justify-between align-center'>
                <div className='lg:pt-3 my-2 mr-2'>
                    <Avatar
                        img={item.img}
                        rounded={true}
                        bordered={true}
                        size="lg"
                    />
                </div>
                <div className='lg:pt-8 my-2 mr-2'>
                    <Button color="failure" onClick={() => handleDelete(item._id)}>
                        Delete
                    </Button>
                </div>
                <div className='lg:pt-8 my-2 mr-2'>
                    <Button color="success" onClick={() => handleInComplete(item)}>
                        Not Complete Task
                    </Button>
                </div>
            </div>
            <div className='lg:p-5 w-full ml-2'>
                <p>About Your Task: </p>
                <p>{item.about}</p>
            </div>
        </div>
    );
};

export default SingleComplete;