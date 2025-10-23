import { motion } from "framer-motion";
import "./ProjectCard.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProjectCard = ({ id, name, price, description, category, image }) => {

   const {url} = useContext(StoreContext)
    
  return (
    <motion.div
      className="project-card" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 0.97, filter: "brightness(1.3)"  }} // subtle card scale on hover
    >
      <div className="image-container">
        <motion.img
          src={`${url}/image/${image[0]}`}
          alt={name}
          className="product-image"
        />
        <div className="overlay">

          <motion.div
            className="text-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} >


            <h2 className="product-title">{name}</h2>
            <p className="product-subtitle"></p>
            <div className="tags">
              <span>{description}</span>
              <span>{category}</span>
            </div>
          </motion.div>



        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
