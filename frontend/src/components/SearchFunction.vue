<template>
    <div class="search-container">
      <i class="material-icons-outlined search-icon">search</i>
      <input type="text" class="search-input" placeholder="Search">
    </div>
  </template>
  
  <style scoped>
  .search-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border: 1px solid #d6d6dc;
  border-radius: 25px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  margin: 0 20px;
  max-width: 600px; /* Optional: Set a maximum width to prevent excessive stretching */
  width: 100%; /* Takes up all available space */
}

.search-icon {
  font-size: 20px;
  color: #a2a7aa;
  margin-right: 8px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  width: 100%; /* Ensures the input takes all remaining space */
}

.search-input::placeholder {
  color: #bbb;
}

  </style>
  