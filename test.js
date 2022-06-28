// const { Telegraf, Composer, Scenes, session, Context } = require("telegraf");
// const dotnv = require("dotenv");
// const axios = require("axios").default;
// const imgToPDF = require("image-to-pdf");
// const fs = require("fs");
// dotnv.config({ path: "config.env" });
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     console.log("db connected");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// const pages = [];
// const TOKEN = process.env.TOKEN;
// // console.log(TOKEN);

// const bot = new Telegraf(TOKEN);
// // bot.setMyCommands([
// //   { command: "/start", description: "botni ishga tushurish" },
// // ]);
// const startWiz = new Composer();
// startWiz.on("text", async (msg) => {
//   const about = msg.update.message.from;
//   // console.log(msg.update.message);
//   const text = msg.update.message.text;
//   msg.telegram.sendMessage(
//     about.id,
//     `Salom qadrli ${about.first_name}  ☺️☺️☺️☺️ bizning image to pdf  Botimizga xush kelibsiz  agar bizning botimizdan foydalanmoqchi bo'lsangiz ✅ yoki ❌ buyrug'idan foydalaning`,
//     {
//       reply_markup: {
//         one_time_keyboard: true,
//         keyboard: [[{ text: "Yes" }], [{ text: "No" }]],
//         resize_keyboard: true,
//         remove_keyboard: true,
//       },
//     }
//   );
//   return msg.wizard.next();
// });
// const fullName = new Composer();

// fullName.on("text", async (msg) => {
//   const about = msg.update.message.from;
//   const text = msg.update.message.text;
//   if (text === "Yes") {
//     // console.log(msg);
//     msg.telegram.sendMessage(
//       about.id,
//       "Biz sizning Image to PDF botimizga xush kelibsiz.Biz ishlashga Tayyormiz.Rasmlarignizni yuboring va PDF formatida o'rnatishingiz mumkin.",
//       {
//         reply_markup: {
//           remove_keyboard: true,
//         },
//       }
//     );
//     return msg.wizard.next();
//   } else if (text === "No") {
//     msg.telegram.sendMessage(
//       about.id,
//       "Bizning botimizdan foydalaningiz uchun tashakkur"
//     );
//   }
// });

// const nameFull = new Composer();
// nameFull.on("photo", async (msg) => {
//   const about = msg.update.message.from;
//   let i = 0;
//   console.log(msg.message.photo[2]);
//   console.log(i++);
//   const photo = msg.message.photo[2].file_id;
//   const image = await bot.telegram.getFileLink(photo);

//   pages.push(`${__dirname}/temp/${photo}.jpg`);

//   const data = await axios.get(image.href, { responseType: "stream" });

//   await data.data.pipe(fs.createWriteStream(`${__dirname}/temp/${photo}.jpg`));
//   msg.telegram.sendMessage(about.id, "IShlayapti");
//   return msg.wizard.next();
// });
// const createPdf = new Composer();
// bot.on("text", async (msg) => {
//   const about = msg.update.message.from;
//   const text = msg.update.message.text;
//   console.log("state");
//   imgToPDF(pages, "A4").pipe(fs.createWriteStream(`./${text}.pdf`));

//   msg.telegram.sendMessage(about.id, "PDF yaratildi 5 soniya kutib turing ");

//   // fs.readFile(`${__dirname}/salom.pdf`, {}, function (err, data) {
//   //   if (!err) {
//   //     console.log("received data: " + data);
//   //     msg.telegram.sendDocument(about.id, {
//   //       source: data,
//   //       filename: `salom.pdf`,
//   //     });
//   //   } else {
//   //     console.log(err);
//   //   }
//   setTimeout(() => {
//     const data = fs.readFileSync(`${__dirname}/${text}.pdf`);

//     msg.telegram.sendDocument(about.id, {
//       source: data,
//       filename: `${text}.pdf`,
//     });
//   }, 5000);

//   return msg.wizard.next();
// });
// const junat = new Composer();
// bot.on("text", async (msg) => {
//   const about = msg.update.message.from;
//   msg.telegram.sendMessage(about.id, "ishladilarku nma");
//   return msg.wizard.next();
// });
// const menuScence = new Scenes.WizardScene(
//   "sceneWizard",
//   startWiz,
//   fullName,
//   nameFull
// );
// const stage = new Scenes.Stage([menuScence]);
// bot.use(session());
// bot.use(stage.middleware());

// bot.command("start", (msg) => {
//   msg.scene.enter("sceneWizard");
// });

// bot.launch();
const fs = require("fs");
fs.readdir(`${__dirname}/temp`, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(`${__dirname}/temp`, file), (err) => {
      if (err) throw err;
    });
  }
});
