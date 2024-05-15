import mongoose from 'mongoose';
const { Schema } = mongoose;

const stripeCustomerSchema = new Schema({

  userId: {
    type: String,
    unique: true,
    required: true
  },
  stripeCustomerID: {
    type: String,
    unique: true,
    required: true
  }
});

export const StripeCustomer = mongoose.models.StripeCustomer || mongoose.model('StripeCustomer', stripeCustomerSchema);
