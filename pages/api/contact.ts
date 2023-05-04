import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const { name, email, message, surname, phone, foretag, agree, radio } =
    req.body

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

    <p style="color: #555;">${
      foretag && `<strong>Företag:</strong>`
    } ${foretag}</p>
    <p style="color: #555;">${phone && `<strong>Telefon:</strong>`} ${phone}</p>

    <h3>Ärendet gäller: </h3>

    ${radio ? `<p style="color: #555;">${radio}</p>` : 'no choice'}

    <h3>Meddelande</h3>
    <p style="color: #555;">${message}</p>
    <br />
    <br />
    ${
      agree === true
        ? `<p style="color: #555;">${name} har godkänt att personuppgifterna spara på ett lagenligt sätt</p>`
        : ''
    }
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
