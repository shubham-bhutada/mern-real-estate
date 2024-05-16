const findAll = (req, res) => {
  console.log("Test api route");
  return res.status(200).json("Test api working!!");
};

module.exports = { findAll };
