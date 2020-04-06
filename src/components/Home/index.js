import React from "react";
import StickyNoteList from "./StickyNoteList";
import Category from "./Category";

class Home extends React.Component {
  // stworzony po to aby przechowywać informacje o wybranej kategorii oraz listę kategorii zeby wyswietlic liste kategorii w komponencie Category, który składa sie z listy kategorii po lewej stronie oraz contentu wybranej kategorii po prawej stronie
  state = { category: null };

  handleCategoryChange = (category, isLoggedUser) => {
    this.setState((prevState) => {
      const categoriesList =
        (prevState.category && prevState.category.categoriesList) ||
        category.categoriesList ||
        [];

      return {
        category: {
          isLoggedUser,
          categoriesList,
          ...category,
        },
      };
    });
  };

  handleReturn = () => {
    this.setState({ category: null });
  };

  //  DEPRECATED
  //  -> do wyrzucenia kliknietej kategorii na pierwszą pozycje
  // sortCategoriesList = (categoriesList, category) => {
  //   let sortedCategoriesList = [...categoriesList];
  //   categoriesList.forEach((otherCategory, index) => {
  //     if (otherCategory._id === category._id) {
  //       sortedCategoriesList.splice(index, 1);
  //     }
  //   });

  //   sortedCategoriesList.unshift(category);
  //   return sortedCategoriesList;
  // };

  render() {
    const { category } = this.state;
    return (
      <div>
        {category ? (
          <Category
            onReturn={this.handleReturn}
            category={category}
            onCategoryChange={this.handleCategoryChange}
          />
        ) : (
          <StickyNoteList onCategoryChange={this.handleCategoryChange} />
        )}
      </div>
    );
  }
}

export default Home;
