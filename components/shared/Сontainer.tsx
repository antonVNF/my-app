import React from 'react';
import {cn} from "@/lib/utils";

interface IProps {
    className: string,
    children: React.ReactNode
}

const Container = ({className, children}: IProps) => {
    return (
        <div className={cn("mx-auto max-w-[1230px]", className)}>
            {children}
        </div>
    );
};

export default Container;