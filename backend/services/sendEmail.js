const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "skrypnyk07@meta.ua",
    pass: "Z5x1c2v3bnm60po",
  },
});

async function sendEmail({ userName, userEmail, userMessage }) {
  let output = `<h1 style="color: green">Доброго дня! Ви отримали листа</h1>
<h2>Вам пише: ${userName}</h2>
<h2>Емаіл для зворотнього зв'язку ${userEmail}</h2>
<h3>Текст повідомлення: ${userMessage}</h3>
<h3 style="color: blue">Дякую! Приходьте ще!</h3>`;

  const info = await transporter.sendMail({
    from: "skrypnyk07@meta.ua", // sender address
    to: "cat19927@gmail.com", // list of receivers
    subject: "Лист для директора компанії GoIT", // Subject line
    text: userMessage, // plain text body
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
