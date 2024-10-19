const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "commercial", "land"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    features: {
      bedrooms: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      area: {
        type: Number,
        required: true,
      },
      furnished: {
        type: Boolean,
        default: false,
      },
      yearBuilt: {
        type: Number,
      },
      parkingSpaces: {
        type: Number,
        default: 0,
      },
      petsAllowed: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    availabilityDate: {
      type: Date,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    // comments: [
    //   {
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //       required: true,
    //     },
    //     timestamp: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", PropertySchema);
