import mongoose from "mongoose";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const geoSchema = new mongoose.Schema(
    {
        lat: { type: String },
        lng: { type: String },
    },
    { _id: false }
);


const addressSchema = new mongoose.Schema(
    {
        street: { type: String, required: true },
        suite: { type: String },
        city: { type: String, required: true },
        zipcode: { type: String, required: true },
        geo: geoSchema,
    },
    { _id: false }
);


const companySchema = new mongoose.Schema(
    {
        name: { type: String },
        catchPhrase: { type: String },
        bs: { type: String },
    },
    { _id: false }
);


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
    address: addressSchema,
    company: companySchema,
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const User = mongoose.models?.user || mongoose.model("user", userSchema);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default User;