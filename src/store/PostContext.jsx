import { createContext,useState } from "react";

export const postContext=createContext()

function PostView({children}){
    const [postDetails, setPostDetails] = useState('')
    return (
        <postContext.Provider value={{postDetails,setPostDetails}}>
                {children}
        </postContext.Provider>
    )

}

export default PostView