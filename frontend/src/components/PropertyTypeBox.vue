<template>
  <div class="property-box">
    <div class="property-info">
      <h4>Property Title</h4>
      <p>Short description of the property.</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.property-box {
  width: 200px;
  height: 280px;
  background: url('../assets/images/property1.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.property-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.property-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  color: #fff;
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.property-box:hover .property-info {
  opacity: 1; /* Fade in text on hover */
}

h4 {
  font-size: 18px;
  margin: 0 0 5px 0;
}

p {
  font-size: 14px;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-box {
    width: 150px;
    height: 220px;
  }

  h4 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
}
</style>
