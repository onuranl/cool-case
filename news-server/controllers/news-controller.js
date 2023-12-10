const { default: axios } = require("axios");

const apiKey = "42b1e0cf5ab645d49c4b9f2ff62b3052";

async function getNews(req, res) {
  const { pageSize, page } = req.query;

  try {
    const api = `https://newsapi.org/v2/everything?q=bitcoin&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

    const response = await axios.get(api);

    if (response.status === 200) {
      return res.status(200).json({
        status: true,
        articles: response.data.articles,
        message: "İşlem başarıyla gerçekleşti.",
      });
    }
  } catch (error) {
    return res.status(203).json({
      status: false,
      error: error.message || "Bir hata meydana geldi.",
    });
  }
}

module.exports = { getNews };
