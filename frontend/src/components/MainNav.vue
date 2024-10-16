<template>
    <nav class="navbar">
      <h3 class="logo">ESTATE</h3>
      <input type="text" class="search-input" placeholder="Search Location">
      <button class="sign-in-btn">Sign In</button>
    </nav>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  
  .search-input {
    flex-grow: 1;
    margin: 0 20px;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #007bff;
  }
  
  .sign-in-btn {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .sign-in-btn:hover {
    background-color: #0056b3;
  }
  
  .sign-in-btn:focus {
    outline: none;
  }
  </style>
  