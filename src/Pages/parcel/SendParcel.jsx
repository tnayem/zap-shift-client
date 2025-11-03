import React from "react";
import { useForm } from "react-hook-form";
import wareHouseData from "../../data/warehouses.json";
import Swal from "sweetalert2";

const SendParcel = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  const regions = [...new Set(wareHouseData.map((w) => w.region))];

  // Watch parcel type and weight dynamically
  const parcelType = watch("parcelType") || "Document";
  const parcelWeight = parseFloat(watch("parcelWeight")) || 0;

  // Watch selected regions and districts for dynamic dropdowns
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const senderDistrict =
    wareHouseData.find((w) => w.region === senderRegion)?.district || "";
  const receiverDistrict =
    wareHouseData.find((w) => w.region === receiverRegion)?.district || "";

  // Cost calculation function
  const calculateCostDetails = (type, weight, senderDist, receiverDist) => {
    const sameDistrict = senderDist === receiverDist;
    const docCost = sameDistrict ? 60 : 80;
    const ndBase = sameDistrict ? 100 : 120;
    const extraWeight = weight > 3 ? weight - 3 : 0;
    const extraCharge = extraWeight * 20;

    const baseCost = type === "Document" ? docCost : ndBase;
    const totalCost = baseCost + (type === "Non-Document" ? extraCharge : 0);

    return {
      sameDistrict,
      type,
      weight,
      baseCost,
      extraWeight,
      extraCharge,
      totalCost,
    };
  };

  const onSubmit = (data) => {
    const details = calculateCostDetails(
      parcelType,
      parcelWeight,
      senderDistrict,
      receiverDistrict
    );

    Swal.fire({
      title: "Confirm Booking?",
      html: `
        <strong>Parcel Type:</strong> ${details.type} <br/>
        <strong>Same District:</strong> ${details.sameDistrict ? "Yes" : "No"} <br/>
        <strong>Base Cost:</strong> ৳${details.baseCost} <br/>
        ${
          details.type === "Non-Document" && details.extraWeight > 0
            ? `<strong>Extra Weight:</strong> ${details.extraWeight} kg × 20 = ৳${details.extraCharge} <br/>`
            : ""
        }
        <strong>Total Cost:</strong> ৳${details.totalCost}
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Booked!",
          `✅ Booking Confirmed! Total Cost: ৳${details.totalCost}`,
          "success"
        );
        console.log("Confirmed Data:", {
          ...data,
          totalCost: details.totalCost,
        });
        reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "❌ Booking Cancelled", "error");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-base-100 p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-4 text-primary">Add Parcel</h1>
      <p className="font-semibold mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Type */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Document"
              {...register("parcelType")}
              defaultChecked
              className="radio radio-success"
            />
            <span>Document</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Non-Document"
              {...register("parcelType")}
              className="radio radio-success"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Name"
            {...register("parcelName", { required: true })}
            className="input input-bordered w-full"
          />

          {parcelType === "Non-Document" && (
            <input
              type="number"
              step="0.01"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight", { required: true })}
              className="input input-bordered w-full"
            />
          )}
        </div>

        {/* Live Cost Display */}
        <div className="text-right text-lg font-semibold text-success">
          Total Cost: ৳
          {calculateCostDetails(
            parcelType,
            parcelWeight,
            senderDistrict,
            receiverDistrict
          ).totalCost.toFixed(2)}
        </div>

        <hr className="my-4" />

        {/* Sender + Receiver Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Sender Details</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Sender Address"
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Sender Contact No"
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {regions.map((r, indx) => (
                  <option key={indx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your district</option>
                {senderDistrict && <option value={senderDistrict}>{senderDistrict}</option>}
              </select>
              <textarea
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Receiver Details</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Receiver Contact No"
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select receiver region</option>
                {regions.map((r, indx) => (
                  <option key={indx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select receiver district</option>
                {receiverDistrict && <option value={receiverDistrict}>{receiverDistrict}</option>}
              </select>
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          * PickUp Time 4pm–7pm Approx.
        </p>

        <button type="submit" className="btn btn-success mt-6">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
