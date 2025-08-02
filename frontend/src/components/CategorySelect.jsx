import { Link } from "react-router-dom";

const CategorySelect = () => {
  const commonWords = ["Top 10", "Top 50", "Top 100", "Top 250"];
  const categories = ["Travel", "Conversation", "Restaurant"];

  return (
    <div className="categorySelect">
      <h3>Select a Category:</h3>
      <div>
        <h4>Most Common Words</h4>
        {commonWords.map((commonWord) => (
          <Link
            key={commonWord}
            to={`/quiz/${commonWord.replace(/\s+/g, "").toLowerCase()}`}
          >
            <button className="primaryButton">{commonWord}</button>
          </Link>
        ))}
      </div>

      <div>
        <h4>Topics</h4>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/quiz/${category.replace(/\s+/g, "").toLowerCase()}`}
          >
            <button className="primaryButton">{category}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
