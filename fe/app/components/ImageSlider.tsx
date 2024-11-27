"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TImage } from "../models/General";

type Props = {
    images: TImage[]
}

const ImageSlider = ({ images }: Props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const prevSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isHovered]);

    const handleMouseOver = (): void => {
        setIsHovered(true);
    };

    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };



    return (
        <div id="featured-post-slider" className="relative cursor-pointer" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className="featured-post-slide">
                {
                    images.map((image, id) => {
                        return <Image key={id} src={image.image || ""} alt={image.id || ""} fill className={" image-slide " + (id == currentIndex ? "image-slide-visible" : "image-slide-invisible")} />
                    })
                }
                <div className="post-content">
                    {
                        images[currentIndex].meta ?
                            <ul className="entry-meta">
                                <li>{images[currentIndex].meta[0]}</li>
                                <li><a href="#" >{images[currentIndex].meta[1]}</a></li>
                            </ul>
                            :
                            ""
                    }
                    <h1 className="slide-title"><a href="single-standard.html" title="">{images[currentIndex].alt}</a></h1>
                </div>
                <button className="absolute left-0 top-1/2 -translate-y-1/2 transform h-fit hover:bg-transparent rounded-xl mx-1  bg-black text-white p-4" onClick={prevSlide} >
                    <Image src={"/images/arrow-left.png"} className="text-gray-400 " alt={""} width={25} height={25} />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 transform h-fit hover:bg-transparent rounded-xl mx-1  bg-black text-white p-4" onClick={nextSlide} >
                    <Image src={"/images/arrow-right.png"} className="text-gray-400" alt={""} width={25} height={25} />
                </button>
            </div>
        </div>
    );
}


export default ImageSlider