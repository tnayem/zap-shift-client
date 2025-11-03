import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import wareHouseData from "../../data/warehouses.json";

const SendParcel = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  // Get unique regions from warehouse data
  const regions = [...new Set(wareHouseData.map((w) => w.region))];

  // Watch dynamic form values
  const parcelType = watch("parcelType") || "Document";
  const parcelWeight = parseFloat(watch("parcelWeight")) || 0;
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");

  // Get districts dynamically
  const senderDistricts =
    wareHouseData
      .filter((w) => w.region === senderRegion)
      .map((w) => w.district) || [];
  const receiverDistricts =
    wareHouseData
      .filter((w) => w.region === receiverRegion)
      .map((w) => w.district) || [];

  // 📌 Cost calculation function (no if-else)
  const calculateCost = (type, weight, senderDist, receiverDist) => {
    const sameDistrict = senderDist === receiverDist;
    const docCost = sameDistrict ? 60 : 80;
    const ndBase = sameDistrict ? 100 : 120;
    const extraWeightCharge = weight > 3 ? (weight - 3) * 20 : 0;
    return type === "Document" ? docCost : ndBase + extraWeightCharge;
  };

  const totalCost = calculateCost(parcelType, parcelWeight, senderDistrict, receiverDistrict);

  const onSubmit = (data) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="font-semibold">Confirm Booking?</span>
        <span className="text-success font-medium">
          💰 Total Cost: ৳{totalCost.toFixed(2)}
        </span>
        <div className="flex justify-center gap-3 mt-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              toast.dismiss(t.id);
              toast.success(
                `✅ Booking Confirmed! Total Cost: ৳${totalCost.toFixed(2)}`,
                { duration: 500 }
              );
              console.log("Confirmed Data:", { ...data, totalCost });
              reset();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => {
              toast.dismiss(t.id);
              toast.error("❌ Booking Cancelled");
            }}
          >
            No
          </button>
        </div>
      </div>
    ));
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
          Total Cost: ৳{totalCost.toFixed(2)}
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
                {senderDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
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
                {receiverDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

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
