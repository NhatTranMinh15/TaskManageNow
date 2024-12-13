'use client'
import Select, { Option } from '@/app/components/Select'
import { categories, Category } from '@/app/models/Blog'
import useDebounce from '@/utils/useDebounce'
import MDEditor from '@uiw/react-md-editor'
import React, { useActionState, useEffect, useState } from 'react'
import useSWR from 'swr'
import { handleFormSubmit } from './action'

type Props = {}

const CreateBlogForm = (props: Props) => {
    const [content, setContent] = useState("");

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [options, setOptions] = useState<Category[]>([]);
    // const { data } = useSWR(() => debouncedSearch ? `${apiUrl}?param=${debouncedSearch}` : null,
    //     assigneeFetcher, {
    //     revalidateOnFocus: false
    // }
    // );
    useEffect(() => {
        setOptions(categories.filter((c) => c.value.toLowerCase().includes(debouncedSearch)))
    }, [debouncedSearch])

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {});

    return (
        <form action={formAction} className='flex w-full max-w-full flex-col'>
            <h2 className='text-4xl font-bold mb-3'>Create Blog</h2>
            <div className='flex flex-col gap-6'>

                <section>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' name='title' className='input w-full' required />
                </section>

                <section>
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input type='file' accept='.jpg,.png' id='thumbnail' name='thumbnail' className='input w-full' />
                </section>

                <section>
                    <label htmlFor="preview">Preview</label>
                    <textarea id='preview' name='preview' className='preview input w-full' />
                </section>

                <section>
                    <label htmlFor="category">Category</label>
                    <Select multiple inputName={'category'} options={options} search={search} setSearch={setSearch} />
                </section>

                <section>
                    <label htmlFor="content">Content</label>
                    <MDEditor
                        value={content}
                        onChange={(value) => setContent(value as string)}
                        preview='edit'
                        maxHeight={1500}
                        style={{ overflow: "hidden" }}
                        textareaProps={{ name: "content", id: "content", required: true }}
                    />
                </section>

                <button
                    type='submit'
                    className='button button-green text-lg'
                    onClick={() => { confirm("Create this blog?") }}
                    disabled={isPending}>
                    {isPending ? "Creating ... " : "Create"}
                </button>
            </div>
        </form>
    )
}

export default CreateBlogForm