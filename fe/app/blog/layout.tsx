import { Suspense } from "react";
import Loading from "../loading";


type Props = {
    children: Readonly<React.ReactNode>
}

const layout = ({ children }: Props) => {
    return (
        <div className='flex items-center justify-center w-full h-full p-6'>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    );
}

export default layout
