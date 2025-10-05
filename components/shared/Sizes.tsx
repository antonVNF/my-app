import React from 'react';
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";
const CATEGORIES = [
    "House Plants",
    "Potter Plants",
    "Seeds",
    "Small Plants",
    "Big Plants",
    "Succulents",
    "Trerrariums",
    "Gardening",
    "Accessories",
]

let activeCategory = 0

const Categories = () => {
    return (<div className={"mb-8"}>
                <Title size={"xs"} text="Categories" className={"font-bold mb-4"}/>
                {CATEGORIES.map((c, i) => {
                    return (
                        <h5 className={cn("text-sm pb-3 pl-7 pr-6 cursor-pointer hover:text-primary transition-colors", i === activeCategory ? "text-primary": "" )}
                            key={c}>
                            {c}
                        </h5>
                    )
                })}
        </div>
    );
};

export default Categories;