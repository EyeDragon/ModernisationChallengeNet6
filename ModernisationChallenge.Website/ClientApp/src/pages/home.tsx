import React, { FC, useEffect, useRef, useState } from "react";
import { homeService } from "@services/home-service";
import { ITask } from "src/models/task-model";
import { Modal, Button, Form, FloatingLabel, Overlay, Tooltip, OverlayTrigger, Popover } from "react-bootstrap";

const Home: FC = () => {
    const [data, setData] = useState<ITask[]>([]);
    const [show, setShow] = useState(false);
    const [loadPage, setLoadPage] = useState(false);
    const [textDetails, setTextDetails] = useState("");
    const [selectedId, setSelectedId] = useState(0);

    const handleClose = () => { setTextDetails(""); setShow(false); };
    const handleShow = () => setShow(true);
    const onEdit = (id: number) => {
        const item = data.find(item => item.id === id);
        setSelectedId(item.id);
        setTextDetails(item.details);
        handleShow();
    };
    const onDelete = async (id: number) => {
        if (confirm("Are you sure that you want to delete this task?") == true) {
            const result = await homeService.asyncDeleteTask(id);
            setLoadPage(!loadPage);
        }
    };
    const onComplete = async (id: number, completed: boolean) => {
        const result = await homeService.asyncCompleteTask({ id, completed: !completed });
        setLoadPage(!loadPage);
    };
    const onSave = async () => {
        if (selectedId === 0) {
            const result = await homeService.asyncSaveTask({ details: textDetails });
        } else {
            const result = await homeService.asyncEditTask({ id: selectedId, details: textDetails });
            setSelectedId(0);
        }

        handleClose();
        setLoadPage(!loadPage);
    }

    useEffect(() => {
        homeService.asyncLoadTasks().then(result => {
            setData(result);
        });
    }, [loadPage])

    return <>
        <div style={{ margin: "15%" }}>
            <h1>
                Tasks
            </h1>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "1px" }}>Completed</th>
                            <th>Details</th>
                            <th style={{ width: "1px" }}></th>
                        </tr>
                    </thead>
                    <tbody style={{ borderStyle: "hidden" }}>
                        {
                            data.map(item => (
                                <tr key={item.id}>
                                    <td style={{ textAlign: "center", width: "1px" }}>
                                        <Form.Check type="checkbox" checked={item.completed} onChange={() => onComplete(item.id, item.completed)} />
                                    </td>
                                    <td>
                                        {item.details}
                                    </td>
                                    <td style={{ width: "1px" }}>
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="right"
                                            overlay={
                                                <Popover id={`popover-positioned-right`}>
                                                    <Popover.Body>
                                                        <span>

                                                        </span>
                                                        <a href="##" className="hollow" onClick={() => onEdit(item.id)}>Edit</a>
                                                        <br />
                                                        <a href="##" className="hollow" onClick={() => onDelete(item.id)}>Delete</a>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <span className="popup_menu">
                                            </span>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr className="info">
                            <td colSpan={99}>
                                <a href="##" className="hollow" onClick={handleShow}>+ Create a new task</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h2>Create task</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="dialogue">
                    <div style={{ width: "750px" }}>

                        <div className="body">
                            <fieldset className="required">
                                <FloatingLabel controlId="floatingTextarea2" label="Details">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                        value={textDetails}
                                        onChange={(evt) => setTextDetails(evt.target.value)}
                                    />
                                </FloatingLabel>
                            </fieldset>
                        </div>

                        <div className="footer">
                            <p className="commands">
                                <span className="grow"></span>
                                <a className="button hollow" onClick={handleClose}>Cancel</a>
                                <a className="button" onClick={() => onSave()}>Save</a>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
}

export default Home;