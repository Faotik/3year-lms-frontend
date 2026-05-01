import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Modules.css";
import { useNavigate } from "react-router-dom";
import getModules from "../services/getModules";
import checkAuth from "../services/checkAuth";
import MultiSelectCheckbox from "../components/ui/MultiSelectCheckbox";
import getUsers from "../services/getUsers";
import addModule from "../services/addModule";
import updateModule from "../services/updateModule";
import deleteModule from "../services/deleteModule";

export default function Modules() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    const [users, setUsers] = useState([]);

    const [modules, setModules] = useState([]);
    const [error, setError] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({ title: "", description: "", users: [] });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createData, setCreateData] = useState({ title: "", description: "", users: [] });

    const [selectedModule, setSelectedModule] = useState("");

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/login");
        }

        const func = async () => {
            {
                const response = await getUsers();

                if (response.ok) {
                    let data = await response.json();
                    data = data.filter((user) => user.role !== "admin");
                    setUsers(data);
                }
            }
        };
        func();

        fetchModules();
    }, []);

    const fetchModules = async () => {
        const response = await getModules();

        if (response.ok) {
            const data = await response.json();
            setModules(data);
        }
        else {
            setError("Unable to connect to the server. Please try again later.");
        }
    }

    const handleOpenEdit = (module) => {
        setSelectedModule(module._id);

        setEditData({
            title: module.title,
            description: module.description,
            users: module.users
        });
        setIsEditOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await updateModule(selectedModule, editData);
        await fetchModules();
        handleCloseEdit();
    };

    const handleOpenCreate = () => {
        setCreateData({ title: "", description: "", users: [] });
        setIsCreateOpen(true);
    };

    const handleCloseCreate = () => {
        setIsCreateOpen(false);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        await addModule({ ...createData });
        await fetchModules();
        handleCloseCreate();
    };

    const handleDeleteModule = async (id) => {
        await deleteModule(id);
        await fetchModules();
    };

    return (
        <>
            <NavBar title="Modules" />
            {error || (
                <div className="modules-page-container">
                    <div className="modules-list">
                        {modules.map((module) => (
                            <div className="modules-card" key={module._id} onClick={() => navigate(`/modules/${module._id}`)}>
                                <h3>{module.title}</h3>
                                <p>{module.description}</p>
                                <div className="modules-card-buttons">
                                    {user.role === "admin" && (
                                        <button
                                            type="button"
                                            className="button-submition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEdit(module);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {user.role === "admin" && (
                                        <button
                                            type="button"
                                            className="button-submition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteModule(module._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {user.role === "admin" && (
                            <div className="modules-card new-module-card" onClick={() => handleOpenCreate()}>
                                <div className="circle">
                                    <p className="plus">+</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {isEditOpen && (
                        <div className="popup-overlay" onClick={handleCloseEdit}>
                            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                <h2>Edit Module</h2>
                                <form onSubmit={handleEditSubmit} className="edit-form">
                                    <div className="edit-form-input">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={editData.title}
                                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="edit-form-input">
                                        <label>Description</label>
                                        <textarea
                                            value={editData.description}
                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        />
                                    </div>

                                    <MultiSelectCheckbox
                                        label="Users"
                                        options={
                                            users.map((user) => ({
                                                display: `${user.name} (${user.role})`,
                                                value: user._id
                                            }))
                                        }
                                        value={editData.users}
                                        onChange={(users) => { setEditData({ ...editData, users }); }}
                                    />

                                    <div className="popup-buttons">
                                        <button type="button" onClick={handleCloseEdit} className="button">
                                            Cancel
                                        </button>
                                        <button type="submit" className="button-submition">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {isCreateOpen && (
                        <div className="popup-overlay" onClick={handleCloseCreate}>
                            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                <h2>Create New Module</h2>
                                <form onSubmit={handleCreateSubmit} className="edit-form">
                                    <div className="edit-form-input">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={createData.title}
                                            onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="edit-form-input">
                                        <label>Description</label>
                                        <textarea
                                            value={createData.description}
                                            onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
                                        />
                                    </div>

                                    <MultiSelectCheckbox
                                        label="Users"
                                        options={
                                            users.map((user) => ({
                                                display: `${user.name} (${user.role})`,
                                                value: user._id
                                            }))
                                        }
                                        value={createData.users}
                                        onChange={(users) => { setCreateData({ ...createData, users }); }}
                                    />
                                    <div className="popup-buttons">
                                        <button type="button" onClick={handleCloseCreate} className="button">Cancel</button>
                                        <button type="submit" className="button-submition">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}