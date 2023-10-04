import React from "react";

// This is a functional component called FilterBar that handles search and sorting.
function FilterBar({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <div id="filter">
      {/* Input for searching by title */}
      <input
        type="text"
        id="search-input"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {/* Dropdown for sorting options */}
      <select
        id="sort-select"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-asc">Date Updated (Ascending)</option>
        <option value="date-desc">Date Updated (Descending)</option>
      </select>
    </div>
  );
}

export default FilterBar;
