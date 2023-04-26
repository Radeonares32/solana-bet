import * as React from 'react'

interface SidebarContextType {
    isOpen: boolean;
}


export const sideBarContext = React.createContext<SidebarContextType | null | any>(null)

export const SideBarContextProvider = (props: any) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const setOpen = (open:boolean) => {
        setIsOpen(open)
    }
    return (
        <sideBarContext.Provider value={{ isOpen, setOpen }}>
            {props.children}
        </sideBarContext.Provider>
    )
}   
