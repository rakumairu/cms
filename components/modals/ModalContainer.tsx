import classes from "./ModalContainer.module.css"
import { ReactNode, useEffect } from "react"

interface IProps {
    children: ReactNode
    isOpen: boolean
    background?: string
    fullScreen?: boolean
    noPadding?: boolean
    notCentered?: boolean
    fullScreenKeyboard?: boolean
    isNested?: boolean
    isNestedOpen?: boolean
    maxWidth?: number
    close?: () => void
}

const ModalContainer = ({ children, isOpen, background, fullScreen, noPadding, notCentered, fullScreenKeyboard, isNested, isNestedOpen, maxWidth, close }: IProps) => {
    useEffect(() => {
        if (!isNested) {
            if (isOpen) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        }
        return () => { document.body.style.overflow = 'auto' }
    }, [])

    useEffect(() => {
        if (!isNested) {
            if (isOpen) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        }
    }, [isOpen])

    return (
        <div className={`${ classes.container } ${ isOpen ? classes.open : classes.close } ${ isNestedOpen ? 'overflow-none' : 'overflow-auto'}`}>
            <div className={`relative min-h-full min-w-full ${fullScreen ? 'w-full h-full' : ''} flex md:items-center justify-center`}>
                <div className={`${classes.backdrop}`} style={{ justifyContent: notCentered ? 'flex-start' : 'center', backgroundColor: fullScreenKeyboard ? 'white' : undefined }} onClick={() => {
                    if (typeof close !== 'undefined') {
                        close()
                    }
                }}>
                </div>
                <div
                    className={`${classes.card} ${ isOpen ? classes['card-open'] : '' } ${background || 'bg-white'} ${ fullScreen ? 'w-full h-full' : fullScreenKeyboard ? 'w-full' : '' } ${ noPadding ? '' : 'p-8'} ${ fullScreen || fullScreenKeyboard ? 'px-0' : '' } rounded`}
                    style={{
                        margin: fullScreenKeyboard ? undefined : notCentered ? '75px 0' : 0,
                        maxWidth
                    }}    
                >
                    { children }
                </div>
            </div>
        </div>
    )
}

export default ModalContainer