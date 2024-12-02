import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, addAddress, setActiveAddress } from "../service/userService";
import Button from "./Button";
import BackButton from "./BackButton";

const ProfilePage = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editableProfile, setEditableProfile] = useState({});
    const [addressForm, setAddressForm] = useState({
        houseNo: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [addressSuccessMessage, setAddressSuccessMessage] = useState("");

    useEffect(() => {
        getProfile(userId)
            .then((response) => {
                setProfileData(response.data);
                setEditableProfile({
                    name: response.data.name,
                    email: response.data.email,
                });
            })
            .catch((error) => console.error("Error fetching profile:", error));
    }, [userId]);

    const handleEditToggle = () => setEditMode(!editMode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        updateProfile(userId, editableProfile)
            .then((response) => {
                setProfileData(response.data);
                setSuccessMessage("Profile updated successfully!");
                setEditMode(false);
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    const handleAddAddress = () => {
        addAddress(userId, addressForm)
            .then((response) => {
                setProfileData(response.data);
                setAddressSuccessMessage("Address added successfully!");
                setIsAddingAddress(false);
                setAddressForm({
                    houseNo: "",
                    area: "",
                    city: "",
                    state: "",
                    pincode: "",
                });
                setTimeout(() => setAddressSuccessMessage(""), 3000);
            })
            .catch((error) => console.error("Error adding address:", error));
    };

    const handleSetActiveAddress = (addressId) => {
        setActiveAddress(userId, addressId)
            .then((response) => {
                setProfileData(response.data);
                setAddressSuccessMessage("Address set as active!");
                setTimeout(() => setAddressSuccessMessage(""), 3000);
            })
            .catch((error) => console.error("Error setting active address:", error));
    };

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <BackButton />
            <h1 className="text-center mb-4 text-xl">User Profile</h1>
            <div className="d-flex flex-column gap-3 card p-4 mb-4">
                <h2>Profile Details</h2>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div>
                    <h5>Name:</h5>
                    {editMode ? (
                        <input
                            type="text"
                            name="name"
                            className="form-control mt-2"
                            value={editableProfile.name}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="mt-2">{profileData.name}</p>
                    )}
                </div>
                <div>
                    <h5>Mobile No:</h5>
                    <p className="mt-2">{profileData.mobileNo}</p>
                </div>
                <div>
                    <h5>Email:</h5>
                    {editMode ? (
                        <input
                            type="email"
                            name="email"
                            className="form-control mt-2"
                            value={editableProfile.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="mt-2">{profileData.email}</p>
                    )}
                </div>
                <div>
                    <h5>Addresses:</h5>
                    {addressSuccessMessage && (
                        <div className="alert alert-success">{addressSuccessMessage}</div>
                    )}
                    <div className="mt-2">
                        {profileData.addressList.map((address, index) => (
                            <div key={index} className="alert alert-secondary p-2">
                                <p>{`${address.houseNo}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`}</p>
                                <Button
                                    bgColor="bg-black"
                                    color="text-white"
                                    btnName="Set Active"
                                    onClick={() => handleSetActiveAddress(address.id)}
                                />
                            </div>
                        ))}
                    </div>
                    {isAddingAddress && (
                        <div className="card p-3 mt-3">
                            <h5>Add New Address</h5>
                            <input
                                type="text"
                                name="houseNo"
                                className="form-control mt-2"
                                placeholder="House No"
                                value={addressForm.houseNo}
                                onChange={handleAddressChange}
                            />
                            <input
                                type="text"
                                name="area"
                                className="form-control mt-2"
                                placeholder="Area"
                                value={addressForm.area}
                                onChange={handleAddressChange}
                            />
                            <input
                                type="text"
                                name="city"
                                className="form-control mt-2"
                                placeholder="City"
                                value={addressForm.city}
                                onChange={handleAddressChange}
                            />
                            <input
                                type="text"
                                name="state"
                                className="form-control mt-2"
                                placeholder="State"
                                value={addressForm.state}
                                onChange={handleAddressChange}
                            />
                            <input
                                type="text"
                                name="pincode"
                                className="form-control mt-2"
                                placeholder="Pincode"
                                value={addressForm.pincode}
                                onChange={handleAddressChange}
                            />
                            <Button
                                bgColor="bg-black"
                                color="text-white"
                                btnName="Add Address"
                                onClick={handleAddAddress}
                            />
                        </div>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <Button
                        bgColor="bg-black"
                        color="text-white"
                        btnName={editMode ? "Cancel" : "Edit Profile"}
                        onClick={handleEditToggle}
                    />
                    {editMode && (
                        <Button
                            bgColor="bg-black"
                            color="text-white"
                            btnName="Save"
                            onClick={handleSave}
                        />
                    )}
                    <Button
                        bgColor="bg-black"
                        color="text-white"
                        btnName={isAddingAddress ? "Cancel Add" : "Add Address"}
                        onClick={() => setIsAddingAddress(!isAddingAddress)}
                    />
                </div>
            </div>
            <Button
                bgColor="bg-black"
                color="text-white"
                btnName="View Orders"
                onClick={() => navigate("/orders")}
            />
        </div>
    );
};

export default ProfilePage;
