import "./styles.css"
import { createPortal } from "react-dom";
import { useImperativeHandle, forwardRef, useState, useRef } from "react";

export const MODAL_STATUS = {
    OK: 1,
    CANCEL: -1,
    CLOSE: -2,
}

const defaultVals = {
    title: "Modal Title",
    content: "Enter content here...",
    onClose: null,
    showOK: true,
    showCancel: true,
    textOK: "OK",
    textCancel: "Cancel"
}

const Modal = ({ config }, forwardedRef) => {
    const [myConfig, setMyConfig] = useState(defaultVals);
    const [visible, setVisible] = useState(false);
    const resolve = useRef();

    useImperativeHandle(forwardedRef, () => ({
        showModal,
    }));

    // The actual method to be exposed to the outside via 'useImperativeHandle'
    const showModal = (withConfig = config || defaultVals) => {
        setMyConfig(withConfig);
        setVisible(true);

        return new Promise((res) => {
            resolve.current = res;
        });
    };

    const resolveWithStatus = (status) => {
        resolve.current(status);
        setVisible(false);
    }

    return createPortal(<>
        <div className={`overlay${visible ? "" : " hidden"}`}></div>
        <div className={`modal${visible ? "" : " hidden"}`}>
            <div className="window">
                <div className="close" onClick={() => {
                    resolveWithStatus(MODAL_STATUS.CLOSE);
                }}>&times;</div>
                <div className="title">{myConfig.title}</div>
                <div className="inner">
                    <div>
                        {myConfig.content}
                    </div>
                </div>
                {(myConfig.showOK || myConfig.showCancel) && <div className="button-bar">
                    {myConfig.showCancel && <button className="cancel" onClick={() => resolveWithStatus(MODAL_STATUS.CANCEL)}>{myConfig.textCancel}</button>}
                    {myConfig.showOK && <button onClick={() => resolveWithStatus(MODAL_STATUS.OK)}>{myConfig.textOK}</button>}
                </div>}
            </div>
        </div></>, document.querySelector("#portal"));
}

export default forwardRef(Modal);
