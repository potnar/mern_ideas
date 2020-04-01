import React from "react";
import CategoryList from "./CategoryList";
import CategoryContent from "./CategoryContent";
import "./Category.scss";

class Category extends React.Component {
  render() {
    const { onCategoryChange, category } = this.props;
    if (!category) return null;
    return (
      <div className="category">
        <CategoryList
          pickedCategoryId={category._id}
          categories={category.categoriesList}
          onCategoryChange={onCategoryChange}
        />
        <CategoryContent category={category} />
      </div>
    );
  }
}

export default Category;
