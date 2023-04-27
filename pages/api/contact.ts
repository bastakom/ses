import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const { name, email, message, surname, phone } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const messageBody = `
  <div style="background-color: #f9f9f9; padding: 20px;">
    <h3 style="color: #333;">Nytt meddelande från ${name} ${surname} (${email})</h3>

    <p style="color: #555;">${phone && `Telefon:`} ${phone}</p>
    <p style="color: #555;">${message}</p>
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
