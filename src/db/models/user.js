import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true 
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apartmentNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.OWNER, ROLES.ADMIN],
      default: ROLES.OWNER,
    },
    apartmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Apartment',               
      required: false,
      default: null
    },
  },
  { timestamps: true }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('User', usersSchema);