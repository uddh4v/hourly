import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    entries: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
        task: {
          type: String,
        },
        progress: {
          type: String,
        },
        hoursWorked: { type: Number, required: true },
        description: { type: String },
      },
    ],
    // projectId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   required: true,
    // },
    // hoursWorked: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    // description: {
    //   type: String,
    //   default: "",
    // },
    // status: {
    //   type: String,
    //   enum: ["draft", "submitted", "approved", "rejected"],
    //   default: "draft",
    // },
    submittedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: Date,
  },
  { timestamps: true }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema);
export default Timesheet;
