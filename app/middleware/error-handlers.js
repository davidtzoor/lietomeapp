const notFound = (req, res) => {
  res.status(404).render('errors/not-found');
};

const serverError = (req, res) => {
  res.status(500).render('errors/server-error');
};

export {
  notFound,
  serverError,
};
