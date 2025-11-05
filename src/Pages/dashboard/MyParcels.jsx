import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2"; // ✅ import SweetAlert2
import useInfo from "../../hooks/useInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useInfo();
    const [paidIds, setPaidIds] = useState([]);

    // 🔹 Fetch parcels using Tanstack Query
    const { data: parcels = [], isLoading ,refetch} = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // ✅ Handle Pay
    const handlePay = async (id) => {
        const confirm = await Swal.fire({
            title: "Confirm Payment",
            text: "Are you sure you want to mark this parcel as paid?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Pay",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a",
        });

        if (confirm.isConfirmed) {
            setPaidIds([...paidIds, id]);
            Swal.fire("Success!", "Parcel marked as paid.", "success");
        }
    };

    // ✅ Handle Delete
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
        });

        if (confirm.isConfirmed) {
            // Delete api
            axiosSecure.delete(`parcels/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount===1) {
                        refetch()
                        Swal.fire("Deleted!", "Parcel has been removed.", "success");
                    }
                })

        }
    };

    // ✅ Handle View (SweetAlert popup)
    const handleView = (parcel) => {
        Swal.fire({
            title: `<strong>📦 ${parcel.parcelName || "Parcel Details"}</strong>`,
            html: `
        <div style="text-align:left">
          <p><b>Tracking ID:</b> ${parcel.traking_id}</p>
          <p><b>Type:</b> ${parcel.parcelType}</p>
          <p><b>Sender:</b> ${parcel.senderName}</p>
          <p><b>Receiver:</b> ${parcel.receiverName}</p>
          <p><b>From:</b> ${parcel.senderDistrict}, ${parcel.senderRegion}</p>
          <p><b>To:</b> ${parcel.receiverDistrict}, ${parcel.receiverRegion}</p>
          <p><b>Cost:</b> ৳${parcel.totalCost}</p>
          <p><b>Date:</b> ${parcel.date}</p>
        </div>
      `,
            icon: "info",
            confirmButtonText: "Close",
            confirmButtonColor: "#2563eb",
        });
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading parcels...</div>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>
            <p className="mb-3">Total: {parcels.length} parcels</p>

            <table className="table table-zebra w-full border border-gray-300">
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost (৳)</th>
                        <th>Payment Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => {
                        const isPaid = paidIds.includes(parcel._id);
                        return (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <span
                                        className={`badge ${parcel.parcelType === "Document"
                                                ? "badge-info"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {parcel.parcelType}
                                    </span>
                                </td>
                                <td>{parcel.date}</td>
                                <td className="font-semibold">{parcel.totalCost}</td>
                                <td>
                                    <span
                                        className={`badge ${isPaid ? "badge-success" : "badge-error"
                                            } text-white`}
                                    >
                                        {isPaid ? "Paid" : "Unpaid"}
                                    </span>
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-info text-white"
                                    >
                                        View
                                    </button>
                                    {!isPaid && (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            Pay
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
