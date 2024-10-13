<template>
  <div class="property">
    <div class="property-top">
      <button class="save-btn">Save</button>
    </div>

    <div>
      <h4>Title</h4>
      <div class="location">Location</div>
    </div>

    <div class="property-bottom">bed bathroom price</div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.property-top {
  width: 180px;
  height: 130px;
  background: url(../assets/images/room.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
  border-radius: 10px;
}
.property {
  background-color: rgb(206, 207, 209);
  width: 180px;
  border-radius: 10px;
  padding-bottom: 10px;
}
.save-btn {
  background-color: blue;
  padding: 5px 10px;
  margin: 10px;
  color: white;
  border: none;
  border-radius: 10px;
}
h4 {
  margin: 8px 0px 2px 5px;
}
.location {
  margin-left: 5px;
}
.property-bottom {
  padding: 5px;
}
</style>
