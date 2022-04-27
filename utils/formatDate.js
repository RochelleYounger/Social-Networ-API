module.exports = function(createdAtVal) {
  return new Date(createdAtVal).toLocaleString();
}