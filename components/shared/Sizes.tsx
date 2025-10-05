import React from 'react';
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";
const SIZES = [
    "Small",
    "Medium",
    "Large",
]

let activeSize = 0

const Sizes = () => {
    return (<div>
                <Title size={"xs"} text="Sizes" className={"font-bold mt-6 mb-4"}/>
                {SIZES.map((c, i) => {
                    return (
                        <h5 className={cn("text-sm pb-3 pl-5 pr-6 cursor-pointer hover:text-primary transition-colors", i+1 === activeSize ? "text-primary": "" )}
                            key={c}>
                            {c}
                        </h5>
                    )
                })}
        </div>
    );
};

export default Sizes;