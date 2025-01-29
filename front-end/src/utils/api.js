import axios from "axios";


// export const fetchData = async (endpoint, populateFields = []) => {
//   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337";
//   const separator = endpoint.includes("?") ? "&" : "?";
//   const populateParams = populateFields.length > 0 
//     ? `${separator}${populateFields.map(field => `populate[${field}]=*`).join("&")}`
//     : "";

//   try {
//     const response = await axios.get(`${API_URL}/api/${endpoint}${populateParams}`);
//     console.log(`✅ Données API reçues pour ${endpoint} :`, response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error(`❌ Erreur API (${endpoint}) :`, error);
//     return [];
//   }
// };

const API_URL = process.env.REACT_APP_API_URL;

export const fetchData = async (endpoint) => {
  // Vérifie si l'endpoint contient déjà un `?`
  const separator = endpoint.includes("?") ? "&" : "?";
  let formattedEndpoint = `api/${endpoint}${separator}populate=*`;

  // // 🔹 Ajout spécifique pour le portfolio : récupère uniquement les images et catégories
  // if (endpoint === "galeries") {
  //   formattedEndpoint = `api/${endpoint}${separator}populate[images][fields][0]=url&populate[categories][fields][0]=nom`;
  // }

  try {
    const response = await axios.get(`${API_URL}/${formattedEndpoint}`);
    console.log("✅ Données API reçues :", response.data);
    return response.data.data;
  } catch (error) {
    console.error("❌ Erreur API :", error);
    return [];
  }
};

// export const fetchData = async (endpoint) => {
  
//   try {
//     const response = await axios.get(`${API_URL}/api/${endpoint}?populate=*`);
//     return response.data.data;
//   } catch (error) {
//     console.error("Erreur API :", error);
//     return [];
//   }
// };

// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// console.log("🚀 API_URL chargée :", process.env.REACT_APP_API_URL);

// export const fetchData = async (endpoint) => {
//   try {
//     const response = await axios.get(`${API_URL}${endpoint}?populate=*`);
//     console.log("🔍 Données API reçues :", response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("❌ Erreur API :", error);
//     return [];
//   }
// };

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337";

// // Vérifie si l'endpoint commence déjà par "api/"
// export const fetchData = async (endpoint) => {
//   console.log(endpoint);
//   const formattedEndpoint = endpoint.startsWith("api/") ? endpoint : `api/${endpoint}`;

//   try {
//     const response = await axios.get(`${API_URL}/${formattedEndpoint}?populate=*`);
//     console.log(`✅ Données API reçues pour ${endpoint} :`, response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error(`❌ Erreur API (${endpoint}) :`, error);
//     return [];
//   }
// };