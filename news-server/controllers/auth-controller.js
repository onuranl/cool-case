async function login(req, res) {
  const { email, password } = req.body;

  if (email && password) {
    return res.status(200).json({
      status: true,
      token: "dXNlckBleGFtcGxlLmNvbTpzZWNyZXQ=",
      user: email,
      message: "İşlem başarıyla gerçekleşti.",
    });
  }

  return res.status(203).json({
    status: false,
    error: "Bir hata meydana geldi.",
  });
}

module.exports = { login };
