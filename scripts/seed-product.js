const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    images: [String],
    variants: [String],
    stock: { type: Number, default: 10 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * Product Model
 */
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

/**
 * Products Data
 */
const productsData = [
  // Pharma
  {
    name: "Omron M3",
    category: "Pharma",
    price: 0,
    stock: 10,
    variants: ["Digital Blood Pressure Monitor"],
    images: ["/images/omron-m3.jpg"],
    featured: true,
  },
  {
    name: "VITROS ORTHO™ Workstation",
    category: "Pharma",
    price: 0,
    stock: 2,
    variants: ["Laboratory Diagnostic System"],
    images: ["/images/vitros-ortho.jpg"],
    featured: true,
  },
  {
    name: "Medica EasyLyte Analyzer",
    category: "Pharma",
    price: 0,
    stock: 4,
    variants: ["Electrolyte Analyzer"],
    images: ["/images/easylyte-analyzer.jpg"],
  },
  {
    name: "On Call Plus",
    category: "Pharma",
    price: 0,
    stock: 15,
    variants: ["Blood Glucose Monitoring System"],
    images: ["/images/oncall-plus.jpg"],
  },
  {
    name: "OMEGA RM4 BLOOD MIXER",
    category: "Pharma",
    price: 0,
    stock: 5,
    variants: ["Blood Mixer"],
    images: ["/images/omega-rm4.jpg"],
  },
  {
    name: "HYC-118/118A Pharmacy Refrigerator",
    category: "Pharmacy Fridges",
    price: 0,
    stock: 3,
    variants: ["Medical Cold Storage"],
    images: ["/images/pharmacy-fridge.jpg"],
    featured: true,
  },

  // Wheelchairs & Mobility
  {
    name: "Under Arm Crutches",
    category: "Crutches",
    price: 1700,
    stock: 20,
    variants: ["Adjustable Height"],
    images: ["/images/under-arm-crutches.jpg"],
  },
  {
    name: "Elbow Crutches",
    category: "Crutches",
    price: 1800,
    stock: 15,
    variants: ["Aluminium"],
    images: ["/images/elbow-crutches.jpg"],
  },
  {
    name: "Walking Frame",
    category: "Walking Frames",
    price: 4500,
    stock: 10,
    variants: ["Foldable"],
    images: ["/images/walking-frame.jpg"],
  },
  {
    name: "Walking Frame With Castors",
    category: "Walking Frames",
    price: 5000,
    stock: 8,
    variants: ["With Wheels"],
    images: ["/images/walking-frame-castors.jpg"],
  },
  {
    name: "Commode Chair",
    category: "Wheelchairs",
    price: 6000,
    stock: 8,
    variants: ["Portable"],
    images: ["/images/commode-chair.jpg"],
  },
  {
    name: "Unfoldable Commode Seat",
    category: "Wheelchairs",
    price: 11000,
    stock: 5,
    variants: ["Heavy Duty"],
    images: ["/images/unfoldable-commode.jpg"],
  },
  {
    name: "Rollator Walker",
    category: "Wheelchairs",
    price: 9000,
    stock: 5,
    variants: ["With Seat"],
    images: ["/images/rollator-walker.jpg"],
  },
  {
    name: "Electric Wheelchair Kenya",
    category: "Wheelchairs",
    price: 100000,
    stock: 2,
    variants: ["Rechargeable"],
    images: ["/images/electric-wheelchair.jpg"],
    featured: true,
  },
  {
    name: "STANDARD WHEELCHAIR- Kenya",
    category: "Wheelchairs",
    price: 11000,
    stock: 7,
    variants: ["Foldable"],
    images: ["/images/standard-wheelchair.jpg"],
  },
  {
    name: "Orthopedic Wheelchair",
    category: "Wheelchairs",
    price: 17000,
    stock: 4,
    variants: ["Orthopedic Support"],
    images: ["/images/orthopedic-wheelchair.jpg"],
    featured: true,
  },

  // Laboratory Equipment
  {
    name: "FINGER TIP PULSE OXIMETER",
    category: "Laboratory Equipment",
    price: 1500,
    stock: 25,
    variants: ["Portable"],
    images: ["/images/pulse-oximeter.jpg"],
    featured: true,
  },
  {
    name: "Pen Torch",
    category: "LAMPS",
    price: 500,
    stock: 30,
    variants: ["LED"],
    images: ["/images/pen-torch.jpg"],
  },
  {
    name: "Alcohol Swabs",
    category: "Laboratory Equipment",
    price: 200,
    stock: 100,
    variants: ["Sterile"],
    images: ["/images/alcohol-swabs.jpg"],
  },
  {
    name: "Portable First Aid Box",
    category: "Medical Equipment",
    price: 1500,
    stock: 20,
    variants: ["Emergency Kit"],
    images: ["/images/first-aid-box.jpg"],
  },
  {
    name: "Fridge Thermometer",
    category: "Medical Equipment",
    price: 500,
    stock: 20,
    variants: ["Digital"],
    images: ["/images/fridge-thermometer.jpg"],
  },
  {
    name: "Drying Oven Kenya",
    category: "Laboratory Equipment",
    price: 30000,
    stock: 3,
    variants: ["Lab Drying Oven"],
    images: ["/images/drying-oven.jpg"],
  },
  {
    name: "LABORATORY INCUBATOR",
    category: "Laboratory Equipment",
    price: 35000,
    stock: 3,
    variants: ["Temperature Controlled"],
    images: ["/images/lab-incubator.jpg"],
    featured: true,
  },
  {
    name: "Centrifuge Machine- Kenya",
    category: "Laboratory Equipment",
    price: 7500,
    stock: 6,
    variants: ["Electric"],
    images: ["/images/centrifuge.jpg"],
  },
  {
    name: "Microscope",
    category: "Laboratory Equipment",
    price: 20000,
    stock: 8,
    variants: ["Optical"],
    images: ["/images/microscope.jpg"],
    featured: true,
  },
  {
    name: "Autoclave Kenya",
    category: "Laboratory Equipment",
    price: 15000,
    stock: 5,
    variants: ["Sterilizer"],
    images: ["/images/autoclave.jpg"],
  },

  // Operating Theatre Equipment
  {
    name: "Oxygen Concentrator Kenya",
    category: "Operating Theatre Equipment",
    price: 66000,
    stock: 4,
    variants: ["5 Litres"],
    images: ["/images/oxygen-concentrator.jpg"],
    featured: true,
  },
  {
    name: "Electrocardiograph 12 Channel",
    category: "Operating Theatre Equipment",
    price: 130000,
    stock: 2,
    variants: ["12 Channel ECG"],
    images: ["/images/ecg-12-channel.jpg"],
  },
  {
    name: "SYRINGE PUMP",
    category: "Operating Theatre Equipment",
    price: 70000,
    stock: 4,
    variants: ["Infusion Pump"],
    images: ["/images/syringe-pump.jpg"],
  },
  {
    name: "PORTABLE OXYGEN CONCENTRATOR 5LTS",
    category: "Operating Theatre Equipment",
    price: 65000,
    stock: 3,
    variants: ["Portable"],
    images: ["/images/portable-oxygen.jpg"],
  },
  {
    name: "MONITOR STAND MOBILE",
    category: "Operating Theatre Equipment",
    price: 35000,
    stock: 5,
    variants: ["Mobile Stand"],
    images: ["/images/monitor-stand.jpg"],
  },
  {
    name: "Operating Table",
    category: "Medical Equipment",
    price: 250000,
    stock: 1,
    variants: ["Hydraulic"],
    images: ["/images/operating-table.jpg"],
    featured: true,
  },
  {
    name: "Theatre Light",
    category: "Operating Theatre Equipment",
    price: 85000,
    stock: 2,
    variants: ["LED Surgical Light"],
    images: ["/images/theatre-light.jpg"],
    featured: true,
  },
  {
    name: "Electric 3 Function Hospital Bed- Kenya",
    category: "Hospital Beds",
    price: 150000,
    stock: 3,
    variants: ["Electric Adjustable"],
    images: ["/images/electric-hospital-bed.jpg"],
  },
  {
    name: "On Call Plus Blood Glucose Monitoring System",
    category: "Blood Pressure Monitors",
    price: 0,
    stock: 12,
    variants: ["Blood Sugar Monitor"],
    images: ["/images/oncall-glucose.jpg"],
  },
  {
    name: "Manual Resuscitator",
    category: "Operating Theatre Equipment",
    price: 3000,
    stock: 15,
    variants: ["Adult"],
    images: ["/images/manual-resuscitator.jpg"],
  },
];

/**
 * Seed Database Function
 */
async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    console.log(
      "MONGODB_URI:",
      process.env.MONGODB_URI ? "Found" : "Not found"
    );

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑 Existing products cleared");

    // Insert products
    const result = await Product.insertMany(productsData);

    console.log(`✅ Seeded ${result.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();