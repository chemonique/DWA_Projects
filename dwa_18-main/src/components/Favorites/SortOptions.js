import React from "react";

function SortOptions({
  sortOrder,
  sortType,
  handleSortChange,
  handleSortTypeChange,
}) {
  return (
    <div>
      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <label htmlFor="sortType">Sort By:</label>
      <select id="sortType" value={sortType} onChange={handleSortTypeChange}>
        <option value="title">Title</option>
        <option value="date">Date Added</option>
      </select>
    </div>
  );
}

export default SortOptions;
