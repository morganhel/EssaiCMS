import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseRichText = (richText) => {
    if (!richText || !Array.isArray(richText)) return "Contenu non disponible";
  
    return richText.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          return <p key={index}>{block.children.map((child, i) => formatText(child, i))}</p>;
  
        case "heading":
          const HeadingTag = `h${block.level || 2}`;
          return <HeadingTag key={index}>{block.children.map((child, i) => formatText(child, i))}</HeadingTag>;
  
        case "list":
          const ListTag = block.format === "ordered" ? "ol" : "ul";
          return (
            <ListTag key={index}>
              {block.children.map((listItem, i) => (
                <li key={i}>{listItem.children.map((child, j) => formatText(child, j))}</li>
              ))}
            </ListTag>
          );
  
        case "blockquote":
          return <blockquote key={index}>{block.children.map((child, i) => formatText(child, i))}</blockquote>;
  
        case "image":
          return (
            <img
              key={index}
              src={block.url}
              alt={block.alt || "Image"}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          );
  
        case "link":
          return (
            <a key={index} href={block.url} target="_blank" rel="noopener noreferrer">
              {block.children.map((child, i) => formatText(child, i))}
            </a>
          );
  
        case "code":
          return (
            <pre key={index}>
              <code>{block.children.map((child, i) => formatText(child, i))}</code>
            </pre>
          );
  
        default:
          return null; // Ignore les autres types non gérés
      }
    });
  };
  
  // Fonction pour formater le texte enrichi (gras, italique, souligné, barré, liens)
  const formatText = (child, key) => {
    let textElement = child.text || "";
  
    if (child.bold) textElement = <strong key={key}>{textElement}</strong>;
    if (child.italic) textElement = <em key={key}>{textElement}</em>;
    if (child.underline) textElement = <u key={key}>{textElement}</u>;
    if (child.strikethrough) textElement = <s key={key}>{textElement}</s>;
  
    if (child.type === "link") {
      return (
        <a key={key} href={child.url} target="_blank" rel="noopener noreferrer">
          {textElement}
        </a>
      );
    }
  
    return textElement;
  };
  
  useEffect(() => {
    fetchData("Articles").then((data) => {
      console.log("🔍 Articles reçus :", data); // Vérifier si les articles sont bien récupérés
      setArticles(data);
      setLoading(false); // Arrête le chargement une fois les données reçues
    }).catch(error => {
      console.error("❌ Erreur lors du chargement :", error);
      setLoading(false); // Arrêter le chargement même en cas d'erreur
    });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:1337/api/Pages?filters[Slug]=accueil")
  //     .then(response => {
  //       console.log("Réponse API complète :", response.data);

  //       const data = response.data.data;
  //       if (data.length > 0) {

  //           console.log("Données de la page Accueil :", data[0]);
  //         console.log("Contenu brut :", data[0].contenu);
  //         setHomePage(data[0]);
  //       } else {
  //         console.error("Aucune page trouvée !");
  //       }
  //     })
  //     .catch(error => console.error("Erreur API :", error))
  //     .finally(() => setLoading(false));
  // }, []);

  if (loading) return <p>Chargement...</p>;
  if (!articles || articles.length === 0) return <p>Aucun article disponible.</p>;


  return (
    <div>
      <h1>Blog</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.titre ?? "Titre non disponible"}</h2>
          <p>{article.resume ?? "Résumé indisponible"}</p>
        </div>
      ))}
    </div>
  );
}

export default Blog;