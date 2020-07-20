import React from 'react';
import classnames from 'classnames';
import styles from './FilterAndSearch.module.scss';

const FilterAndSearch = ({
  setNotes,
  setSearchInput,
  setSelectedVal,
  allNotes,
  selectVal,
  SearchInput,
}) => {
  // Handle search bar input
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle <select> filter input
  const handleSelectChange = (e) => {
    const target = e.target.value;
    setSelectedVal(target);

    // Based on the selected sort value, sort the locally stored notes in selected order and update state

    // Sort by more recently added/updated notes
    if (target === 'desc') {
      const SortedNotes = allNotes.sort((a, b) =>
        a.LastEdit < b.LastEdit ? 1 : -1
      );
      setNotes(SortedNotes);

      // Sort by oldest notes
    } else if (target === 'asc') {
      const SortedNotes = allNotes.sort((a, b) =>
        b.LastEdit < a.LastEdit ? 1 : -1
      );
      setNotes(SortedNotes);

      // Sort notes alphabetically A -> Z
    } else if (target === 'alphabeticalDesc') {
      // const SortedNotes = allNotes.sort((a, b) => (a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1));
      const SortedNotes = allNotes.sort((a, b) =>
        a.Title.split(' ').join('').toLowerCase() >
        b.Title.split(' ').join('').toLowerCase()
          ? 1
          : -1
      );
      setNotes(SortedNotes);

      // Sort notes alphabetically Z -> A
    } else if (target === 'alphabeticalAsc') {
      const SortedNotes = allNotes.sort((a, b) =>
        b.Title.split(' ').join('').toLowerCase() >
        a.Title.split(' ').join('').toLowerCase()
          ? 1
          : -1
      );
      setNotes(SortedNotes);
    }
  };
  return (
    <div className={styles.FilterAndSearch}>
      {/* Select element to filter notes by */}
      <div className="select">
        <select value={selectVal} onChange={handleSelectChange}>
          <option disabled value="desc">
            Sort Notes
          </option>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
          <option value="alphabeticalDesc">Alphabetical A -&gt; Z</option>
          <option value="alphabeticalAsc">Alphabetical Z -&gt; A</option>
        </select>
      </div>

      {/* Input field to search notes */}
      <div className={classnames('field', styles.searchContainer)}>
        <p className="control has-icons-left">
          <input
            className="input"
            type="email"
            placeholder="Search notes"
            value={SearchInput}
            onChange={handleSearchInput}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FilterAndSearch;
