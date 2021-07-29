const mongoose= require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    maxLenght: [100, "name cannt be exceed"],
  },
  price: {
    type: Number,
    required: [true, "please enter product name"],
    maxLenght: [5, "name cannt be exceed then 5 digits"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter the product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id:{
          type:String,
          required:true
      },
      url:{
          type:String,
          required:true
      }

    },
  ],
  category:{
      type:String,
      required:[true,'Please  Select the category of product.'],
      enum:{
          values:[
            'Electronics',
            'Cameras',
            'Laptops',
            'Accessories',
            'Headphones',
            'Food',
            "Books",
            'Clothes/Shoes',
            'Beauty/Health',
            'Sports',
            'Outdoor',
            'Home'
          ],
          message:'please select correct category for product'
      }
  },
  seller:{
      type:String,
      required:[true, 'please enter the seller name']
  },
  stock:{
    type:Number,
    required:[true,'please enter Product Stock'],
    maxLenght:[5, 'please name cannot exceed 5 charcater'],
    defulat:0
  },
  numOfReviews:{
      type:Number,
      default:0
  },
  reviews:[
      {
          name:{
              type:String,
              required:true
          },
          rating:{
              type:Number,
              required:true
          },
          comment:{
              type:String,
              required:true
              
          }
      }
  ],
  createdAt:{
      type:Date,
      default: Date.now


  }
});

module.exports= mongoose.model('Product', productSchema);