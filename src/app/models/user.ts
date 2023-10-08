import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error('Password cannot contain "password"');
                }
            },
        },
        cpf: {
            type: String,
            trim: true,
        },
        rg: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        mobilephone: {
            type: String,
            trim: true,
        },
        birthday: {
            type: Date,
        },
        gender: {
            type: String,
            trim: true,
        },
        profile: {
            type: String,
            required: true,
            enum: [
                "ADMIN",
                "MANAGER",
                "PROMOTER",
                "COMPANY",
                "MOBILE",
                "PROCON",
                "CDL",
                "DIGITALINFLUENCER",
            ],
            trim: true,
        },
        address: {
            zipCode: {
                type: String,
                trim: true,
            },
            street: {
                type: String,
                trim: true,
            },
            number: {
                type: String,
                trim: true,
            },
            neighborhood: {
                type: String,
                trim: true,
            },
            complement: {
                type: String,
                trim: true,
            },
            city: {
                type: String,
                trim: true,
            },
            state: {
                type: String,
                trim: true,
            },
        },
        code: {
            type: String,
            trim: true,
        },
        extension: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Extension",
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        favoritedCompanies: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Company",
                },
            ],
            default: undefined,
        },
        sharedCompanies: {
            type: [
                {
                    media: {
                        type: String,
                        enum: ["Whatsapp", "Facebook", "Instagram", "Linkedin"],
                    },
                    company: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Company",
                    },
                },
            ],
            default: undefined,
        },
        favoritedFlyers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Flyer",
                },
            ],
            default: undefined,
        },
        visualizedFlyers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Flyer",
                },
            ],
            default: undefined,
        },
        sharedFlyer: {
            type: [
                {
                    media: {
                        type: String,
                        enum: ["Whatsapp", "Facebook", "Instagram", "Linkedin"],
                    },
                    flyer: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Flyer",
                    },
                },
            ],
            default: undefined,
        },
        savedFlyers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Flyer",
                },
            ],
            default: undefined,
        },
        history: {
            type: {
                _id: false,
                tags: [
                    {
                        type: [String],
                    },
                ],
                companies: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Company",
                    },
                ],
            },
            default: undefined,
        },
        eventsIds: {
            type: [
                {
                    eventId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Event",
                    },
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
            default: undefined,
        },
        avatar: {
            name: String,
            size: Number,
            key: String,
            url: String,
        },
        lastLogin: {
            type: Date,
        },
        status: {
            type: Boolean,
            default: true,
        },
        createIdUser: {
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    {
        collection: "users",
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
