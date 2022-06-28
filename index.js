const dotnv = require("dotenv");
dotnv.config({ path: "./config.env" });
const { Telegraf } = require("telegraf");
const axios = require("axios").default;
const imgToPDF = require("image-to-pdf");
const fs = require("fs");

const bot = new Telegraf(process.env.TOKEN);

let son = 0;
const pages = [];
bot.command("/start", async (msg) => {
  const about = msg.update.message.from;
  msg.telegram.sendMessage(
    about.id,
    `Salom qadrli ${about.first_name}  ☺️☺️☺️☺️ bizning image to pdf  Botimizga xush kelibsiz  agar bizning botimizdan foydalanmoqchi bo'lsangiz ✅ yoki ❌ buyrug'idan foydalaning`,
    {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [[{ text: "Yes" }], [{ text: "No" }]],
        resize_keyboard: true,
        remove_keyboard: true,
      },
    }
  );
});

bot.on("text", async (msg) => {
  const about = msg.update.message.from;
  const text = msg.update.message.text;

  if (son == 0) {
    if (text == "Yes") {
      msg.telegram.sendMessage(
        about.id,
        "Biz sizning Image to PDF botimizga xush kelibsiz.Biz ishlashga Tayyormiz.Rasmlarignizni yuboring va PDF formatida o'rnatishingiz mumkin.",
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
    } else if (text === "No") {
      msg.telegram.sendMessage(
        about.id,
        "Bizning botimizdan foydalaningiz uchun tashakkur"
      );
    }
  }
  if (son == 1) {
    imgToPDF(pages, "A4").pipe(fs.createWriteStream(`./${text}.pdf`));

    msg.telegram.sendMessage(about.id, "PDF yaratildi 10 soniya kutib turing ");

    // fs.readFile(`${__dirname}/salom.pdf`, {}, function (err, data) {
    //   if (!err) {
    //     console.log("received data: " + data);
    //     msg.telegram.sendDocument(about.id, {
    //       source: data,
    //       filename: `salom.pdf`,
    //     });
    //   } else {
    //     console.log(err);
    //   }
    setTimeout(() => {
      const data = fs.readFileSync(`${__dirname}/${text}.pdf`);

      msg.telegram.sendDocument(about.id, {
        source: data,
        filename: `${text}.pdf`,
      });
      son = 0;
      fs.rmdirSync(`temp`, { recursive: true });
      fs.unlinkSync(`${__dirname}/${text}.pdf`);
      fs.mkdirSync(`${__dirname}/temp`);
    }, 10000);
  }
});

bot.on("photo", async (msg) => {
  const about = msg.update.message.from;
  let i = 0;
  console.log(msg.message.photo[2]);
  console.log(i++);
  const photo = msg.message.photo[2].file_id;
  const image = await bot.telegram.getFileLink(photo);

  pages.push(`${__dirname}/temp/${photo}.jpg`);

  const data = await axios.get(image.href, { responseType: "stream" });

  await data.data.pipe(fs.createWriteStream(`${__dirname}/temp/${photo}.jpg`));
  msg.telegram.sendMessage(about.id, "IShlayapti");
  son = 1;
});
bot.launch();
