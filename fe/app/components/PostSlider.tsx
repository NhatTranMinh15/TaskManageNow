"use client";
import { useState } from "react";
import Image from "next/image";
import { TImage } from "../models/General";

type Props = {
    images: TImage[]
}

const PostSlider = ({ images }: Props) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    return (
        <div className="relative w-full min-h-[400px] overflow-hidden cursor-pointer" onClick={nextSlide}>
            {
                images.map((image, id) => {
                    return <Image key={id} src={image.image || ""} alt={image.alt} fill className={"image-slide " + (id == currentIndex ? "image-slide-visible" : "image-slide-invisible")} />
                })
            }
        </div>
    )
}

export default PostSlider