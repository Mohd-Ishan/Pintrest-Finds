import express from 'express'
import multer from 'multer'
import { addproduct, listproduct, removeproduct } from '../controllers/productcontroller.js';

const productRouter = express.Router();

// login for image store in upload folder

const storage = multer.diskStorage({
  destination:'upload',
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})

const upload=multer({storage:storage})

// Product Route

productRouter.post('/add',upload.array("image", 5),addproduct);
productRouter.get('/list',listproduct);
productRouter.post('/remove',removeproduct)


// 'images' must match your form field name
// '5' = maximum number of images allowed per product

export default productRouter;