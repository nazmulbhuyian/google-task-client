import { Avatar, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SingleTask = ({ item, refetch }) => {



    const navigate = useNavigate()

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/taskDelete/${id}`, {
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



    const handleComplete = (item) => {
        const info = {
            img: item.img,
            email: item.email,
            about: item.about
        }
        fetch(`http://localhost:5000/taskComplete/${item._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    fetch(`http://localhost:5000/taskDelete/${item._id}`, {
                        method: 'DELETE',
                        headers: {

                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                toast.success('Task Complete Successfully')
                                navigate('/completedTask')
                            }
                        })

                }
            })
    }


    const [show, setShow] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = '14f1e107e329b44a04c4481b2e76451e';

    const onSubmit = (data) => {
        
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if(imgData.status_code === 400){
                    toast.error('Please Add A Photo')
                }
                if (imgData) {
                    const update = {
                        img: imgData.data.url,
                        about: data.about,
                    }
                    fetch(`http://localhost:5000/update/${item._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(update)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                toast.success('Make Update Successfully')
                                refetch();
                            }
                        })
                }
            })
    }


    return (
        <div className='lg:m-8 border-2 m-2'>

            <div className='lg:pt-3 py-3 lg:py-0'>
                <Avatar
                    img={item.img}
                    rounded={true}
                    bordered={true}
                    size="lg"
                />
            </div>
            <div className='grid grid-cols-3 justify-between align-center'>

                <div className='lg:pt-8 lg:ml-6 ml-4'>
                    <>
                        <Button color="warning" onClick={() => setShow(!show)}>
                            Update
                        </Button>
                        <Modal
                            show={show}
                            size="md"
                            popup={true}
                            onClose={() => setShow(!show)}
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Please Update Your Data
                                    </h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className='mb-3 dark:text-white'>
                                            <label className="label">
                                                <span className="label-text text-bold text-2xl">About Task</span>
                                            </label>
                                            <textarea {...register("about", { required: true })} className="textarea textarea-primary w-full h-52 dark:bg-gray-600 dark:text-white" placeholder="About Tasks" defaultValue={item?.about}></textarea>
                                            {errors.about && <p className='text-red-600'>{errors.about?.message}</p>}
                                        </div>

                                        <div className='dark:text-white'>
                                            <label className="label">
                                                <span className="label-text text-bold text-2xl">Upload Image</span>
                                            </label>
                                            <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-success w-full" />
                                            {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}

                                        </div>
                                        <Button type="submit" className='btn btn-accent w-full mt-5 hover:bg-emerald-500 p-2'>
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                </div>
                <div className='lg:pt-8'>
                    <Button color="failure" onClick={() => handleDelete(item._id)}>
                        Delete
                    </Button>
                </div>
                <div className='lg:pt-8 mr-2 lg:ml-0'>
                    <Button color="success" onClick={() => handleComplete(item)}>
                        Complete Task
                    </Button>
                </div>
            </div>
            <div className='lg:p-5 w-full'>
                <p>About Your Task: </p>
                <p>{item.about}</p>
            </div>
        </div>
    );
};

export default SingleTask;