import React from 'react'

function Alert(props) {
    const style = `alert alert-${props.type} alert-dismissible fade show fixed-top`
    return (
        <div className={style} role="alert">
            <strong>{props.type === "success" || props.type === "info" ? "Info: ":"Error: "}</strong>
            {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert