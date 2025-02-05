import React, { useEffect, useRef, useState } from "react";
import "./Students.css";
import logo from "../../assets/favicon.ico";
import data from "../../api/users.json";
import plus from "../../assets/icons/plus.svg";
import verified from "../../assets/icons/verified.svg";
import search from "../../assets/icons/search.svg";
import actions from "../../assets/icons/actions.svg";
import rightbtnbl from "../../assets/icons/VectorRightBlack.png";
import leftbtnbl from "../../assets/icons/VectorLeftBlack.png";
import rightbtn from "../../assets/icons/VectorRight.png";
import leftbtn from "../../assets/icons/VectorLeft.png";
import toggler from "../../assets/icons/VectorBot.png";
import deleteIcon from "../../assets/icons/delete.svg";
import burger from "../../assets/icons/burger-bar.png";
import { Link } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal.jsx";
import { StudentForm } from "../../components/StudentForm/StudentForm";

export default function Students() {
  const [menuVisibility, setMenuVisibility] = useState({});
  const [users, setUsers] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleActionsMenu = (userId) => {
    setMenuVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleCloseMenu = (userId) => {
    setMenuVisibility((prev) => ({
      ...prev,
      [userId]: false,
    }));
  };

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen((prev) => !prev);
    document.body.classList.toggle("dashboard-open", !isBurgerOpen);
  };

  const handleOverlayClick = () => {
    setIsBurgerOpen(false);
    document.body.classList.remove("dashboard-open");
  };

  if (usersPerPage > users.length) setUsersPerPage(users.length);
  let indexOfLastUser = currentPage * usersPerPage;
  if (indexOfLastUser > users.length) indexOfLastUser = users.length;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisibility({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuToggled((cur) => !cur);
  };

  const chooseRow = (option) => {
    setUsersPerPage(option);
    setCurrentPage(1);
    setIsMenuToggled(false);
  };

  const handleAddStudent = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const nextPage = () => {
    setCurrentPage((cur) => cur + 1);
  };

  const prevPage = () => {
    setCurrentPage((cur) => cur - 1);
  };

  const filteredUsers = users.filter((user) =>
    [user.name, user.company, user.role].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
    if (selectedUsers.length + 1 === users.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setSelectAll(false);
  };

  return (
    <div className="container">
      <div
        className={`overlay ${isBurgerOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
      ></div>

      <div className={`dashboard ${isBurgerOpen ? "open" : ""}`}>
        <img src={logo} alt="logo" />
        <div className="dashboard-links">
          <Link
            to="/students"
            className="dashboard-link"
            onClick={() => setIsBurgerOpen(false)}
          >
            Students
          </Link>
          <Link to="/" className="dashboard-link">
            Log-out
          </Link>
        </div>
      </div>
      <div className="main">
        <div className="header">
          <button className="burger-button" onClick={toggleBurgerMenu}>
            <img src={burger} alt="menu" className="burger" />
          </button>
          <h4 className="name">Students</h4>
          <button className="add-button" onClick={handleAddStudent}>
            <img src={plus} alt="plus" />
            <span> New student</span>
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>{selectedUser ? "Edit Student" : "Add Student"}</h2>
          <StudentForm
            onClose={() => setIsModalOpen(false)}
            selectedUser={selectedUser}
            setUsers={setUsers}
            users={users}
          />
        </Modal>

        <div className="list">
          {selectedUsers.length > 0 ? (
            <div className="selected-actions">
              <span>{selectedUsers.length} selected</span>
              <button className="delete-button" onClick={handleDeleteSelected}>
                <img src={deleteIcon} alt="delete" />
              </button>
            </div>
          ) : (
            <div className="search-container">
              <div className="search">
                <img src={search} alt="search" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={
                      selectedUsers.length === users.length && users.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Company</th>
                <th>Role</th>
                <th>Verified</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="username">
                    <img
                      className="avatar"
                      src={`${process.env.PUBLIC_URL}${user.img}`}
                      alt="avatar"
                    />

                    <span>{user.name}</span>
                  </td>
                  <td>{user.company}</td>
                  <td>{user.role}</td>
                  <td className="verified">
                    {user.verified ? <img src={verified} alt="ver" /> : "-"}
                  </td>
                  <td>
                    <div
                      className={`status ${
                        user.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="actions"
                      onClick={() => toggleActionsMenu(user.id)}
                    >
                      <img src={actions} alt="actions" />
                    </button>

                    {menuVisibility[user.id] && (
                      <div
                        className="actions-menu"
                        ref={menuRef}
                        onClick={() => handleCloseMenu(user.id)}
                      >
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <span>Rows per page:</span>
            <div className="choosediv" onClick={toggleMenu}>
              <span>{usersPerPage}</span>
              <img className="toggler" src={toggler} alt="toggler" />
              <div
                className={isMenuToggled ? "rows-options-open" : "rows-options"}
                ref={menuRef}
              >
                <div className="row-option" onClick={() => chooseRow(5)}>
                  5
                </div>
                <div className="row-option" onClick={() => chooseRow(10)}>
                  10
                </div>
                <div className="row-option" onClick={() => chooseRow(25)}>
                  25
                </div>
              </div>
            </div>
            <span>
              {indexOfFirstUser + 1}-{indexOfLastUser} of {users.length}
            </span>
            <button
              className="left-btn"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              <img src={currentPage === 1 ? leftbtn : leftbtnbl} alt="left" />
            </button>
            <button
              className="right-btn"
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              onClick={nextPage}
            >
              <img
                src={
                  currentPage === Math.ceil(users.length / usersPerPage)
                    ? rightbtn
                    : rightbtnbl
                }
                alt="right"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
