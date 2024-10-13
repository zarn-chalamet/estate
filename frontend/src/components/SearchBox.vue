<template>
  <div class="search-bar">
    <select class="search-select">
      <option value="">Type</option>
    </select>
    <input type="text" class="search-input" placeholder="Enter Keywords" />
    <button class="search-filters">Filters</button>
    <button class="search-button">Search</button>
  </div>
</template>

<script>
export default {}
</script>

<style>
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.search-select,
.search-input,
.search-filters,
.search-button {
  border: none;
  outline: none;
  border-radius: 30px;
  margin-right: 10px;
}

.search-select {
  padding: 10px 20px;
  width: 150px;
  font-size: 16px;
  background-color: #f5f5f5;
}

.search-input {
  padding: 10px 20px;
  flex: 1;
  font-size: 16px;
  background-color: #f5f5f5;
  min-width: 150px;
}

.search-filters {
  padding: 10px 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
}

.search-button {
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-select,
  .search-input,
  .search-filters,
  .search-button {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-button {
    padding: 10px;
  }
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
