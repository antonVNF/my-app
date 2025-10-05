import React from 'react';
import Categories from "@/components/shared/Categories";
import RangeSlider from "@/components/shared/Range-slider";
import Sizes from "@/components/shared/Sizes";
import Link from "next/link";
import Image from "next/image";

const Filters = () => {
    return (<div className="w-[310px]">
        <div className=" bg-sidebar-ring pl-4 pt-3.5 pr-6 pb-4.5">
            <Categories/>
            <RangeSlider/>
            <Sizes/>
        </div>
            <div className="relative w-full h-[470px]">
                <Link href="/">
                    <Image
                        src="/discount-plant.jpg"
                        alt="discount plants"
                        fill
                        className="object-cover w-[310px]"
                    />
                </Link>
            </div>

        </div>
    );
};

export default Filters;