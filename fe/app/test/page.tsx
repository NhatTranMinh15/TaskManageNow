'use client'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { handleFormSubmit } from './action';

type Props = {}

const page = (props: Props) => {
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {});


    return (
        <div>
            <form action={formAction}>
                <input type='file' accept='.jpg,.png' id='thumbnail' name='thumbnail' className='input w-full' />
                <button type="submit" className='button'>submit</button>
            </form>
        </div>
    )
}

export default page