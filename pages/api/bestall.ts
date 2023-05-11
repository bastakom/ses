import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const {
    name,
    email,
    selectedProdukts,
    selectedBestallAntal,
    selectedMinBestallning,
    selectedEnhet
  } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const tableRows = Object.entries(selectedProdukts).map(([productId, value]) => {
    const enhet = selectedEnhet[productId]
    const minBestallning = selectedMinBestallning[productId]
    const bestallAntal = selectedBestallAntal[productId]
    return `
      <tr>
        <td>${value}</td>
        <td>${enhet}</td>
        <td>${minBestallning}</td>
        <td>${bestallAntal}</td>
      </tr>
    `;
  }).join('');

  const messageBody = `
    <div style="background-color: #f9f9f9; padding: 20px;">
      <table style="width:100%;">
        <thead>
          <tr style="text-align:left;">
            <th>Produkt</th>
            <th>Enhet</th>
            <th>Min beställning</th>
            <th>Beställt Antal</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `No-reply form ${new Date().toISOString()} <sentemailform@gmail.com>`,
      to: 'philip@bastakompisar.se',
      subject: `New message from ${name} (${email})`,
      html: messageBody
    })

    res.status(200).json({ message: 'Message sent successfully.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error sending message.' })
  }
}
