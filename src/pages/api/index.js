export default function handler(req, res) {
  const { name, mail, phone, age } = req.body

  res
    .status(200)
    .json({
      message: 'Los datos cargados son correctos!',
      status: 'success',
      data: { name, mail, phone, age },
    })
}
