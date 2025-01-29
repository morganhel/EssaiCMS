import { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchData } from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337";

Modal.setAppElement("#root"); // Assure l’accessibilité pour les lecteurs d'écran


function Galeries() {
  const [galeries, setGaleries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData("galeries").then((data) => {
      console.log("✅ Données API galeries reçues :", data);

      if (Array.isArray(data)) {
        setGaleries(data);

        // Extraire toutes les catégories uniques des galeries
        const allCategories = [
          ...new Set(
            data.flatMap((gal) =>
              gal.categorie?.nom || []
            )
          ),
        ];
        setCategories(allCategories);
      } else {
        console.error("❌ Données des galeries non valides :", data);
      }
    });
  }, []);

  // Extraire toutes les images avec leur catégorie associée
  const allImages = galeries.flatMap((gal) =>
    gal.image?.map((img) => ({
      url: `${API_URL}${img.url}`,
      category: gal.categorie?.nom || "Autre",
    })) || []
  );

  console.log("🔍 Images extraites :", allImages); // Vérification console

  // Filtrer les images selon la catégorie sélectionnée
  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

    // Ouvrir la lightbox
    const openModal = (imageUrl) => {
      setSelectedImage(imageUrl);
      setModalIsOpen(true);
    };
  
    // Fermer la lightbox
    const closeModal = () => {
      setSelectedImage(null);
      setModalIsOpen(false);
    };

  return (
    <div>
      <h1>Galeries</h1>

      {/* Filtres par catégories */}
      <div>
        <button onClick={() => setSelectedCategory("all")}>Toutes</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Affichage des images filtrées */}
      {filteredImages.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {filteredImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Image ${index}`}
              style={{ width: "100%", borderRadius: "10px" }}
              onClick={() => openModal(image.url)}
            />
          ))}
        </div>
      ) : (
        <p>Aucune image disponible pour cette catégorie.</p>
      )}

      {/* Lightbox */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90vw',
          maxHeight: '90vh',
          padding: '0',
          background: 'transparent',
          border: 'none',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
      }}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Agrandissement"
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            onClick={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}

export default Galeries;
