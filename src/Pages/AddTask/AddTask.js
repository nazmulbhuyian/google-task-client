import { Button, Label, Spinner, Textarea } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const AddTask = () => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        <Button>
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3">
                Loading...
            </span>
        </Button>
    }

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = '14f1e107e329b44a04c4481b2e76451e';

    const onSubmit = data => {
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
                if (imgData) {
                    const task = {
                        img: imgData.data.url,
                        about: data.about,
                        email: user?.email
                    }
                    fetch('https://google-task-server.vercel.app/addTasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged === true) {
                                toast.success('Your Task added successfully')
                                navigate('/myTask')
                            }
                        })
                }
            })
    };

    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const info = {
                email: user?.email,
                about: message
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
                        // toast.success('Product added successfully')
                        navigate('/myTask')
                    }
                })
        }
    };

    return (
        <div>
            {
                user ?
                    ''
                    :
                    <h1 className='text-center text-3xl'>Please <Link to='/login' className='font-bold underline text-sky-500'>Login</Link> For Add Your Daily Task</h1>
            }
            <div className='lg:w-8/12 lg:mx-auto lg:flex lg:mt-16 mx-8 mt-8'>


                <div className='lg:flex'>

                    <div id="textarea" className='mb-16 lg:mb-0'>
                        <div className="mb-2 block">
                            <Label
                                className="text-2xl"
                                htmlFor="daily"
                                value="Add Your Daily Tasks And Press Enter"
                            />
                        </div>
                        {
                            user ?
                                <Textarea
                                    id="daily"
                                    placeholder="enter your daily task"
                                    required={true}
                                    rows={8}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleChange}
                                />
                                :
                                <Textarea
                                    id="daily"
                                    placeholder="Please Log In"
                                    required={true}
                                    rows={8}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleChange}
                                    disabled
                                />
                        }
                    </div>

                    <div className='lg:ml-24'>
                        <h1 className='text-2xl font-bold'>Add Your Task With Picture</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='mb-3 dark:text-white'>
                                <label className="label">
                                    <span className="label-text text-bold text-2xl">About Task</span>
                                </label>
                                <textarea {...register("about", { required: true })} className="textarea textarea-primary w-full h-52 dark:bg-gray-600 dark:text-white" placeholder="About Tasks"></textarea>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text text-bold text-2xl">Upload Image</span>
                                </label>
                                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-success w-full" />
                            </div>

                            {
                                user ?
                                    <Button type="submit" className='btn btn-accent w-full mt-5 hover:bg-emerald-500 p-2'>
                                        Submit
                                    </Button>
                                    :
                                    <Button type="submit" className='btn btn-accent w-full mt-5 hover:bg-emerald-500 p-2' disabled>
                                        Please Login For Anable Button
                                    </Button>
                            }
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AddTask;