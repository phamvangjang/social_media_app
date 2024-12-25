import { Smile, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { getBase64, validate } from '@/utils/helpers';
import { apiCreatePost } from '@/apis';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Model } from '.';
import { toast } from 'sonner';

const CreatePost = () => {
    const [loading, setLoading] = useState(false);
    const { current } = useSelector((state) => state.user);
    const textareaRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiSelect = (emoji) => {
        const currentValue = getValues('caption') || '';
        if (currentValue.length < 2200) {
            const updatedValue = currentValue + emoji.native;
            setValue('caption', updatedValue); // Update form value
            // Update the textarea's value using the ref
            if (textareaRef?.current) {
                textareaRef.current.value = updatedValue;
            }
        }
    };
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [])
    const { register, formState: { errors }, reset, handleSubmit, watch, setValue, getValues } = useForm();
    const [preview, setPreview] = useState({
        images: []
    });
    const [payload, setPayload] = useState({})

    const [hoverElm, setHoverElm] = useState(null)

    const [invalidFields, setInvalidFields] = useState([])

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    // Hàm resize ảnh bằng canvas
const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                // Giữ nguyên tỷ lệ ảnh khi resize
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.floor((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.floor((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                // Thiết lập kích thước canvas
                canvas.width = width;
                canvas.height = height;

                // Vẽ ảnh lên canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Chuyển canvas sang base64
                resolve(canvas.toDataURL('image/jpeg', 0.9)); // Chất lượng 90%
            };

            img.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);

        reader.readAsDataURL(file);
    });
};

    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('This file is not supported')
                return
            }
            // const resizedImage = await resizeImage(file, 1080, 1080); // Resize ảnh về kích thước 1080x1080
            const base64 = await getBase64(file)
             // Resize ảnh và nhận Base64
        // const resizedBase64 = await resizeImage(file, 1080, 1080);
            imagesPreview.push({ name: file.name, path: base64 })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }

    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')]);

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            setLoading(true);
            const finalPayload = {
                ...data,
                ...payload,
                username: current?.username
            }
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            // setTimeout
            setLoading(true);
            const response = await apiCreatePost(formData);
            setLoading(false);
            if (response.success) {
                toast.success(response.mes);
                reset();
                setPayload({ images: [] }),
                    setValue('caption', ''); // Clear the caption field
                if (textareaRef?.current) {
                    textareaRef.current.value = ''; // Clear the textarea directly
                }
            } else {
                toast.error(response.mes)
            }
        }
    }

    const handleRemoveImage = (name) => {
        const files = [...watch('images')]
        reset({
            images: files?.filter(el => el.name !== name)
        })
        if (preview.images?.some(el => el.name)) setPreview(prev => ({ ...prev, images: prev.images?.filter(el => el.name !== name) }))
    }
    return (
        <div className='flex flex-col items-center gap-2 w-full relative'>
            <div>
                <h2 className='text-2xl font-semibold'>Tạo bài viết mới</h2>
            </div>
            <div className='w-full h-full'>
                <form
                    className='items-start w-full h-full grid grid-cols-3'
                    onSubmit={handleSubmit(handleCreateProduct)}>
                    <div className='flex items-center justify-center flex-col gap-4 h-full col-span-2'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold mt-8' htmlFor='product'>Upload images</label>
                            <input
                                type='file'
                                id='product'
                                multiple
                                {...register('images', { required: 'Need fill this field' })}
                            />
                            {errors['images'] && <small
                                className='text-xs text-red-500 italic'
                            >
                                {errors['images']?.message}
                            </small>}
                        </div>

                        {preview.images.length > 0 && <div className='my-4 w-full h-[300px] overflow-y-scroll gap-1 flex-wrap grid grid-cols-3'>
                            {preview.images?.map((el, idx) => (
                                <div
                                    onMouseEnter={() => setHoverElm(el.name)}
                                    onMouseLeave={() => setHoverElm(null)}
                                    key={idx}
                                    className='w-fit relative col-span-1'>
                                    <img
                                        src={el.path}
                                        alt='product'
                                        className='w-full h-w-full object-cover'
                                    />
                                    {hoverElm === el.name && <div
                                        onClick={() => handleRemoveImage(el.name)}
                                        className='cursor-pointer flex items-center justify-center animate-scale-up-center absolute inset-0 bg-overlay'>
                                        <Trash2 size={32} color='white' />
                                    </div>}
                                </div>
                            ))}
                        </div>}

                    </div>

                    {/* Caption */}
                    <div className='border-gray-800 h-full border-t-[1px]'>
                        <div className='h-[90%] mx-4 flex flex-col'>
                            <div className='flex items-center gap-3 py-4'>
                                <span><img src={current?.avatar} className='h-7 w-7 rounded-full' alt="avatar" /></span>
                                <span>{current?.username}</span>
                            </div>
                            <div className='h-full flex flex-col items-start gap-1'>
                                <textarea
                                    ref={textareaRef}
                                    name="caption"
                                    id="caption"
                                    {...register('caption', {
                                        required: 'Need fill this field',
                                        maxLength: {
                                            value: 2200,
                                            message: 'Caption cannot exceed 2200 characters',
                                        },
                                    })}
                                    maxLength={2200}
                                    className='h-full w-full p-2 outline-none resize-none'>
                                </textarea>
                                {errors['caption'] && <small className='text-xs text-red-500 italic'>
                                    {errors['caption']?.message}
                                </small>}
                            </div>
                            <div className='flex items-center justify-between py-2 relative'>
                                <span
                                    onClick={() => setShowPicker((prev) => !prev)}
                                    className="cursor-pointer"
                                >
                                    <Smile size={20} />
                                </span>
                                {showPicker && (
                                    <div className="absolute z-[100] right-72 bottom-10">
                                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                    </div>
                                )}
                                <span className='text-[#c7c7c7] text-xs'>{watch('caption')?.length || 0}/2200</span>
                            </div>
                        </div>

                        <div className='border-t-[1px] border-gray-800 flex items-center justify-center py-4'>
                            <Button
                                className="flex items-center bg-blue-500 hover:bg-blue-400 text-white w-full py-2 px-4 justify-center rounded-lg">
                                Chia sẻ
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            {loading && <Model />}
        </div>
    )
}

export default CreatePost