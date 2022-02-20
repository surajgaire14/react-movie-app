const handleLogout = (req, res) => {
    res.cookie("refreshToken", "", { 
      maxAge: 0,
      httpOnly: true 
    });
  
    return res.status(204).json({msg:"Successfully deleted cookie..."})
  };

  module.exports = handleLogout